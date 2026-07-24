import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/success")({
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
  useEffect(() => { clear(); }, [clear]);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-6 py-32 text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-accent">Confirmed</div>
        <h1 className="mt-4 text-4xl text-primary md:text-6xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Thank you, beautiful.
        </h1>
        <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">
          Your order is confirmed. A receipt is on its way to your inbox, and your
          soft luxury essentials will ship shortly.
        </p>
        <Link
          to="/shop"
          className="mt-10 inline-flex bg-primary px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground hover:bg-primary/90"
        >
          Continue shopping
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}
