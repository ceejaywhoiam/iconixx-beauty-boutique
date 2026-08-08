import { createServerFn } from "@tanstack/react-start";
import { getProduct } from "@/lib/products";
import { assertAllowedOrigin } from "@/lib/origin";

interface CheckoutInput {
  items: Array<{ id: string; quantity: number }>;
}

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator((data: CheckoutInput) => {
    if (!data || !Array.isArray(data.items) || data.items.length === 0) {
      throw new Error("Cart is empty");
    }
    const items = data.items
      .map((i) => ({
        id: String(i.id),
        quantity: Math.max(1, Math.min(99, Math.floor(Number(i.quantity) || 1))),
      }))
      .slice(0, 50);
    return { items };
  })
  .handler(async ({ data, request }) => {
    assertAllowedOrigin(request.headers.get("origin"));

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Stripe is not configured");

    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(key);
    const origin = new URL(request.url).origin;

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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU"] },
      automatic_tax: { enabled: false },
    });

    return { url: session.url };
  });
