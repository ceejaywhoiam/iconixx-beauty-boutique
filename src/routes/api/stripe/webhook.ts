import { createFileRoute } from "@tanstack/react-router";

// In-memory idempotency store for processed Stripe event IDs.
// For production, replace with a persistent store (e.g., a Supabase table).
// TODO: replace with Supabase `stripe_events` table insert with unique constraint on event_id.
const processedEventIds = new Set<string>();

export const Route = createFileRoute("/api/stripe/webhook")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("[stripe/webhook] STRIPE_WEBHOOK_SECRET is not configured");
      return new Response("Webhook secret not configured", { status: 500 });
    }

    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      console.warn("[stripe/webhook] Missing stripe-signature header");
      return new Response("Missing stripe-signature", { status: 400 });
    }

    const rawBody = await request.text();

    let event: import("stripe").Stripe.Event;
    try {
      const { default: Stripe } = await import("stripe");
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      console.warn("[stripe/webhook] Signature verification failed:", (err as Error).message);
      return new Response("Invalid signature", { status: 400 });
    }

    // Idempotency guard — skip already-processed events.
    if (processedEventIds.has(event.id)) {
      console.info("[stripe/webhook] Duplicate event skipped:", event.id);
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as import("stripe").Stripe.Checkout.Session;
        console.info("[stripe/webhook] checkout.session.completed", {
          sessionId: session.id,
          paymentStatus: session.payment_status,
          amountTotal: session.amount_total,
          metadata: session.metadata,
        });

        // TODO: mark corresponding order as paid in your persistence layer using
        // session.metadata.cartId or session.metadata.itemsHash for reconciliation.
      } else {
        console.info("[stripe/webhook] Unhandled event type:", event.type);
      }

      // Mark event as processed only after successful handling.
      processedEventIds.add(event.id);

      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("[stripe/webhook] Handler error for event", event.id, err);
      return new Response("Internal error", { status: 500 });
    }
      },
    },
  },
});

