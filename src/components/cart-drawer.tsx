import { Link } from "@tanstack/react-router";
import { ShoppingBag, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { detailed, subtotal, count, setQuantity, removeItem, isOpen, setOpen } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
          <SheetTitle className="text-display text-xl text-primary">
            Your Bag{count > 0 ? ` (${count})` : ""}
          </SheetTitle>
        </div>

        {count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blush/40 text-primary">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <button
              onClick={() => setOpen(false)}
              className="bg-primary px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-primary-foreground hover:bg-primary/90"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border/60 overflow-y-auto px-6">
              {detailed.map((l) => (
                <li key={l.product.id} className="flex gap-4 py-5">
                  <Link
                    to="/product/$id"
                    params={{ id: l.product.id }}
                    onClick={() => setOpen(false)}
                    className="block h-20 w-20 flex-shrink-0 overflow-hidden bg-blush/30"
                  >
                    <img
                      src={l.product.image}
                      alt={l.product.name}
                      className="h-full w-full object-contain p-1.5"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to="/product/$id"
                        params={{ id: l.product.id }}
                        onClick={() => setOpen(false)}
                        className="text-[11px] uppercase tracking-[0.2em] hover:text-primary"
                      >
                        {l.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(l.product.id)}
                        aria-label={`Remove ${l.product.name}`}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => setQuantity(l.product.id, l.quantity - 1)}
                          className="px-2.5 py-1 text-sm hover:bg-blush/30"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="min-w-7 text-center text-sm">{l.quantity}</span>
                        <button
                          onClick={() =>
                            setQuantity(l.product.id, Math.min(l.product.quantity, l.quantity + 1))
                          }
                          className="px-2.5 py-1 text-sm hover:bg-blush/30"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-primary">${l.lineTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border/60 px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="uppercase tracking-[0.2em] text-muted-foreground">Subtotal</span>
                <span className="text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Shipping &amp; tax calculated at checkout.
              </p>
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="mt-5 block w-full bg-primary px-6 py-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground hover:bg-primary/90"
              >
                View bag &amp; checkout
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="mt-3 w-full border border-border px-6 py-3 text-[10px] uppercase tracking-[0.25em] hover:border-primary hover:text-primary"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
