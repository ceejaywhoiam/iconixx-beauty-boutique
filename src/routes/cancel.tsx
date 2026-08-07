import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/cancel")({
  head: () => ({
    meta: [
      { title: "Checkout Cancelled — TIMELESS ICONIXX Beauty" },
      {
        name: "description",
        content: "Your checkout was cancelled and your bag is still waiting for you.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CancelPage,
});

function CancelPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-6 py-32 text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-accent">Checkout Cancelled</div>
        <h1
          className="mt-4 text-4xl text-primary md:text-6xl"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Your bag is still waiting.
        </h1>
        <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">
          No charge was made. You can review your bag, make changes, and try checkout again whenever
          you&apos;re ready.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/cart"
            className="inline-flex bg-primary px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground hover:bg-primary/90"
          >
            Return to bag
          </Link>
          <Link
            to="/shop"
            className="inline-flex border border-border px-8 py-3 text-[10px] uppercase tracking-[0.25em] hover:border-primary hover:text-primary"
          >
            Continue shopping
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
