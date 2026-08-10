import { createServerFn } from "@tanstack/react-start";
import { getProduct } from "@/lib/products";

interface CheckoutInput {
  items: Array<{ id: string; quantity: number; options?: Record<string, string> }>;
  origin?: string;
}

const FREE_SHIPPING_THRESHOLD_CENTS = 7500;

async function getStripe() {
  const key = process.env["STRIPE_SECRET_KEY"];
  if (!key) throw new Error("Stripe is not configured");
  const { default: Stripe } = await import("stripe");
  return new Stripe(key);
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

    try {
      const stripe = await getStripe();
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
  .inputValidator((data: CheckoutInput) => {
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
        options:
          i.options && typeof i.options === "object"
            ? Object.fromEntries(
                Object.entries(i.options)
                  .slice(0, 5)
                  .map(([k, v]) => [String(k).slice(0, 40), String(v).slice(0, 80)]),
              )
            : undefined,
      }))
      .slice(0, 50);
    return { items, origin: data.origin };
  })
  .handler(async ({ data }) => {
    const stripe = await getStripe();
    const origin = data.origin;

    let subtotal = 0;
    const line_items = data.items.map((i) => {
      const product = getProduct(i.id);
      if (!product) throw new Error(`Unknown product: ${i.id}`);
      if (product.quantity <= 0) throw new Error(`${product.name} is sold out`);
      if (i.quantity > product.quantity) {
        throw new Error(`Only ${product.quantity} left of ${product.name}`);
      }
      const unit_amount = Math.round(product.price * 100);
      subtotal += unit_amount * i.quantity;

      const shade = i.options?.["shade"];
      const description = [product.tagline, shade ? `Shade: ${shade}` : null]
        .filter(Boolean)
        .join(" · ");

      return {
        quantity: i.quantity,
        adjustable_quantity: { enabled: true, minimum: 1, maximum: product.quantity },
        price_data: {
          currency: "usd",
          unit_amount,
          product_data: {
            name: shade ? `${product.name} — ${shade}` : product.name,
            ...(description ? { description } : {}),
            ...(product.image.startsWith("http") ? { images: [product.image] } : {}),
            metadata: { product_id: product.id, category: product.category },
          },
        },
      };
    });

    const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD_CENTS;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: freeShipping ? "Complimentary Standard Shipping" : "Standard Shipping",
            fixed_amount: { amount: freeShipping ? 0 : 599, currency: "usd" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Express Shipping",
            fixed_amount: { amount: 1499, currency: "usd" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 3 },
            },
          },
        },
      ],
      metadata: {
        app: "iconixx-beauty-boutique",
        cart: JSON.stringify(
          data.items.map((i) => ({ id: i.id, q: i.quantity, s: i.options?.["shade"] ?? null })),
        ).slice(0, 480),
      },
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL");
    return { url: session.url, id: session.id };
  });

export const getCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string }) => {
    const id = String(data?.sessionId ?? "");
    if (!/^cs_[A-Za-z0-9_]+$/.test(id)) throw new Error("Invalid session id");
    return { sessionId: id };
  })
  .handler(async ({ data }) => {
    const stripe = await getStripe();
    const session = await stripe.checkout.sessions.retrieve(data.sessionId, {
      expand: ["line_items"],
    });

    return {
      status: session.status ?? null,
      paymentStatus: session.payment_status ?? null,
      email: session.customer_details?.email ?? null,
      name: session.customer_details?.name ?? null,
      amountTotal: session.amount_total ?? null,
      amountSubtotal: session.amount_subtotal ?? null,
      shippingAmount: session.total_details?.amount_shipping ?? null,
      discountAmount: session.total_details?.amount_discount ?? null,
      currency: session.currency ?? "usd",
      lineItems:
        session.line_items?.data.map((li) => ({
          description: li.description ?? "",
          quantity: li.quantity ?? 1,
          amount: li.amount_total ?? 0,
        })) ?? [],
    };
  });
