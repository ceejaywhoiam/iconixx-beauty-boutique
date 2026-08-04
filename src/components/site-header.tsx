import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";

const NAV_LINKS = [
  { to: "/", label: "Home", exact: true },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 md:grid-cols-3">
        <div className="flex items-center md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center border border-border hover:border-primary hover:text-primary"
            >
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetTitle className="text-display border-b border-border/60 px-6 py-5 text-xl text-primary">
                TIMELESS ICONIXX
              </SheetTitle>
              <nav className="flex flex-col px-6 py-4 text-[12px] uppercase tracking-[0.25em]">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    activeOptions={link.exact ? { exact: true } : undefined}
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-border/40 py-4 text-foreground/70 transition-colors hover:text-primary"
                    activeProps={{ className: "!text-primary" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Link to="/" className="flex min-w-0 flex-col leading-none md:justify-self-start">
          <span className="text-display truncate text-2xl text-primary">
            TIMELESS ICONIXX
          </span>
          <span className="tracking-[0.35em] text-[10px] uppercase text-accent">Beauty</span>
        </Link>
        <nav className="hidden items-center justify-center gap-10 text-[11px] uppercase tracking-[0.25em] md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={link.exact ? { exact: true } : undefined}
              className="text-foreground/70 transition-colors hover:text-primary"
              activeProps={{ className: "!text-primary" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-3">
          <Link
            to="/cart"
            aria-label={`Shopping bag with ${count} item${count === 1 ? "" : "s"}`}
            className="relative flex h-11 w-11 items-center justify-center border border-border hover:border-primary hover:text-primary"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-blush/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <div
            className="text-3xl text-primary"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            TIMELESS ICONIXX
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.35em] text-accent">Beauty</div>
          <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
            Soft luxury cosmetics for the woman who walks in confidence.
            Founded by CEO Shara Frison.
          </p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-primary">Explore</div>
          <ul className="mt-6 space-y-3 text-sm">
            <li><Link to="/shop" className="hover:text-primary">Shop All</Link></li>
            <li><Link to="/about" className="hover:text-primary">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-primary">The Timeless Iconixx List</div>
          <p className="mt-6 text-sm font-light text-muted-foreground">
            Drops, restocks, and soft-luxury moments in your inbox.
          </p>
          <form className="mt-5 flex gap-0" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="min-w-0 flex-1 border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <button className="bg-primary px-5 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-primary-foreground hover:bg-primary/90">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-6 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        © {new Date().getFullYear()} TIMELESS ICONIXX Beauty
      </div>
    </footer>
  );
}
