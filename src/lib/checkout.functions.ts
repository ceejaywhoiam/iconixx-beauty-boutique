import { createServerFn } from "@tanstack/react-start";
import { getProduct } from "@/lib/products";

interface CheckoutInput {
  items: Array<{ id: string; quantity: number }>;
  origin?: string;
}

export type SessionVerificationStatus = "confirmed" | "pending" | "invalid";

export interface SessionVerificationResult {
  status: SessionVerificationStatus;
  sessionId: string | null;
}

/** Retrieve and verify a Checkout Session from Stripe server-side. */
export const verifyCheckoutSession = createServerFn({ method: "GET" })
  .validator((data: { sessionId?: string }) => ({
    sessionId: typeof data?.sessionId === "string" ? data.sessionId.slice(0, 200) : null,
  }))
  .handler(async ({ data }): Promise<SessionVerificationResult> => {
    if (!data.sessionId) {
      return { status: "invalid", sessionId: null };
    }

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.error("[verifyCheckoutSession] STRIPE_SECRET_KEY is not configured");
      return { status: "invalid", sessionId: data.sessionId };
    }

    try {
      const { default: Stripe } = await import("stripe");
      const stripe = new Stripe(key);
      const session = await stripe.checkout.sessions.retrieve(data.sessionId);

      if (session.status === "complete" && session.payment_status === "paid") {
        return { status: "confirmed", sessionId: data.sessionId };
      }
      if (session.status === "open" || session.payment_status === "unpaid") {
        return { status: "pending", sessionId: data.sessionId };
      }
      return { status: "invalid", sessionId: data.sessionId };
    } catch (err) {
      console.warn("[verifyCheckoutSession] Failed to retrieve session:", (err as Error).message);
      return { status: "invalid", sessionId: data.sessionId };
    }
  });

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator((data: CheckoutInput) => {
    if (!data || !Array.isArray(data.items) || data.items.length === 0) {
      throw new Error("Cart is empty");
    }
    if (typeof data.origin !== "string" || !/^https?:\/\//.test(data.origin)) {
      throw new Error("Invalid origin");
    }
    const items = data.items
      .map((i) => ({
        id: String(i.id),
        quantity: Math.max(1, Math.min(99, Math.floor(Number(i.quantity) || 1))),
      }))
      .slice(0, 50);
    return { items, origin: data.origin };
  })
  .handler(async ({ data }) => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Stripe is not configured");

    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(key);
    const origin = data.origin;

    const line_items = data.items.map((i) => {
      const product = getProduct(i.id);
      if (!product) throw new Error(`Unknown product: ${i.id}`);
      return {
        quantity: i.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            description: product.tagline || undefined,
          },
        },
      };
    });

    // Build non-sensitive metadata for reconciliation.
    const itemsSummary = data.items.map((i) => `${i.id}x${i.quantity}`).join(",");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU"] },
      automatic_tax: { enabled: false },
      metadata: {
        app: "iconixx-beauty-boutique",
        itemCount: String(data.items.length),
        itemsSummary: itemsSummary.slice(0, 500),
        createdAt: new Date().toISOString(),
      },
    });

    return { url: session.url };
  });
