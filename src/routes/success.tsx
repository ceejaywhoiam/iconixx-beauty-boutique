import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { useCart } from "@/lib/cart";
import { getCheckoutSession } from "@/lib/checkout.functions";

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

function money(cents: number | null | undefined) {
  return `$${((cents ?? 0) / 100).toFixed(2)}`;
}

function SuccessPage() {
  const { clear } = useCart();
  const { session_id } = Route.useSearch();
  const fetchSession = useServerFn(getCheckoutSession);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["checkout-session", session_id],
    enabled: Boolean(session_id),
    retry: false,
    queryFn: () => fetchSession({ data: { sessionId: session_id as string } }),
  });

  const paid = data?.paymentStatus === "paid";

  useEffect(() => {
    if (paid) clear();
  }, [paid, clear]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-6 py-28">
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-accent">
            {paid ? "Confirmed" : isLoading ? "Checking…" : "Order Status"}
          </div>
          <h1
            className="mt-4 text-4xl text-primary md:text-6xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {paid
              ? "Thank you, beautiful."
              : isLoading
                ? "Confirming your order…"
                : "We couldn't confirm your checkout."}
          </h1>
          <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">
            {paid
              ? `Your order is confirmed${data?.email ? ` and a receipt is on its way to ${data.email}` : ""}. Your soft luxury essentials will ship shortly.`
              : isLoading
                ? "One moment while we verify your payment with Stripe."
                : isError || !session_id
                  ? "If you completed payment, please check your email for Stripe's receipt. Otherwise, return to your bag and try again."
                  : "Your payment hasn't completed yet. If you were charged, your receipt will arrive by email."}
          </p>
        </div>

        {paid && data && (
          <div className="mt-12 border border-border/60 bg-blush/20 p-8 text-left">
            <div className="text-[10px] uppercase tracking-[0.35em] text-primary">Order Summary</div>
            <ul className="mt-6 divide-y divide-border/60">
              {data.lineItems.map((li, idx) => (
                <li key={idx} className="flex justify-between gap-4 py-3 text-sm">
                  <span className="text-muted-foreground">
                    {li.description} × {li.quantity}
                  </span>
                  <span className="text-primary">{money(li.amount)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-2 border-t border-border/60 pt-6 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd>{money(data.amountSubtotal)}</dd>
              </div>
              {Boolean(data.discountAmount) && (
                <div className="flex justify-between text-muted-foreground">
                  <dt>Discount</dt>
                  <dd>−{money(data.discountAmount)}</dd>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <dt>Shipping</dt>
                <dd>{data.shippingAmount ? money(data.shippingAmount) : "Complimentary"}</dd>
              </div>
              <div className="flex justify-between pt-2 text-primary">
                <dt className="uppercase tracking-[0.2em] text-[11px]">Total</dt>
                <dd>{money(data.amountTotal)}</dd>
              </div>
            </dl>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={paid ? "/shop" : "/cart"}
            className="inline-flex bg-primary px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground hover:bg-primary/90"
          >
            {paid ? "Continue shopping" : "Return to bag"}
          </Link>
          {!paid && (
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
