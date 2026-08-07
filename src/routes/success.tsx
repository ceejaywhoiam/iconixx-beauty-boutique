import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/success")({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — TIMELESS ICONIXX Beauty" },
      { name: "description", content: "Thank you for your TIMELESS ICONIXX Beauty order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { clear } = useCart();
  const { session_id } = Route.useSearch();

  useEffect(() => {
    if (session_id) clear();
  }, [clear, session_id]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-6 py-32 text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-accent">
          {session_id ? "Confirmed" : "Order Status"}
        </div>
        <h1 className="mt-4 text-4xl text-primary md:text-6xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
          {session_id ? "Thank you, beautiful." : "We couldn't confirm your checkout."}
        </h1>
        <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">
          {session_id
            ? "Your order is confirmed. A receipt is on its way to your inbox, and your soft luxury essentials will ship shortly."
            : "If you completed payment, please check your email for Stripe's receipt. Otherwise, return to your bag and try again."}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={session_id ? "/shop" : "/cart"}
            className="inline-flex bg-primary px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground hover:bg-primary/90"
          >
            {session_id ? "Continue shopping" : "Return to bag"}
          </Link>
          {!session_id && (
            <Link
              to="/shop"
              className="inline-flex border border-border px-8 py-3 text-[10px] uppercase tracking-[0.25em] hover:border-primary hover:text-primary"
            >
              Shop the collection
            </Link>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
