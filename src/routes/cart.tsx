import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { useCart } from "@/lib/cart";
import { createCheckoutSession } from "@/lib/checkout.functions";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — TIMELESS ICONIXX Beauty" },
      { name: "description", content: "Review your soft luxury cosmetics and check out securely." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, subtotal, setQuantity, removeItem, count } = useCart();
  const checkoutFn = useServerFn(createCheckoutSession);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setError(null);
    setLoading(true);
    try {
      const { url } = await checkoutFn({
        data: {
          items: detailed.map((l) => ({ id: l.product.id, quantity: l.quantity })),
          origin: window.location.origin,
        },
      });
      if (url) window.location.href = url;
      else throw new Error("Checkout failed");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-[10px] uppercase tracking-[0.4em] text-accent">Your Bag</div>
        <h1 className="mt-3 text-4xl text-primary md:text-6xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Shopping Bag
        </h1>
        <div className="mt-3 h-1 w-16 bg-blush" />

        {count === 0 ? (
          <div className="mt-16 border border-border/60 bg-blush/20 p-12 text-center">
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex bg-primary px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-primary-foreground hover:bg-primary/90"
            >
              Shop the collection
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
            <ul className="divide-y divide-border/60 border-y border-border/60">
              {detailed.map((l) => (
                <li key={l.product.id} className="flex gap-4 py-6">
                  <Link to="/product/$id" params={{ id: l.product.id }} className="block h-24 w-24 flex-shrink-0 overflow-hidden bg-blush/30">
                    <img src={l.product.image} alt={l.product.name} className="h-full w-full object-contain p-2" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link to="/product/$id" params={{ id: l.product.id }} className="text-xs uppercase tracking-[0.25em] hover:text-primary">
                        {l.product.name}
                      </Link>
                      <div className="mt-1 text-[11px] text-muted-foreground">{l.product.category}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => setQuantity(l.product.id, l.quantity - 1)}
                          className="px-3 py-1 text-sm hover:bg-blush/30"
                          aria-label="Decrease quantity"
                        >−</button>
                        <span className="min-w-8 text-center text-sm">{l.quantity}</span>
                        <button
                          onClick={() => setQuantity(l.product.id, Math.min(l.product.quantity, l.quantity + 1))}
                          className="px-3 py-1 text-sm hover:bg-blush/30"
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeItem(l.product.id)}
                        className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-sm text-primary">${l.lineTotal.toFixed(2)}</div>
                </li>
              ))}
            </ul>

            <aside className="h-fit border border-border/60 bg-blush/20 p-8">
              <div className="text-[10px] uppercase tracking-[0.35em] text-primary">Summary</div>
              <div className="mt-6 flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Shipping & tax</span>
                <span>Calculated at checkout</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-8 w-full bg-primary px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? "Redirecting…" : "Checkout"}
              </button>
              {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
              <button
                onClick={() => router.navigate({ to: "/shop" })}
                className="mt-3 w-full border border-border px-6 py-3 text-[10px] uppercase tracking-[0.25em] hover:border-primary hover:text-primary"
              >
                Continue shopping
              </button>
            </aside>
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
