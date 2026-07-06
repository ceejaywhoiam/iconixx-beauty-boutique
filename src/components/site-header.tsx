import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 md:grid-cols-3">
        <Link to="/" className="flex min-w-0 flex-col leading-none">
          <span
            className="truncate text-2xl text-primary"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            TIMELESS ICONIXX
          </span>
          <span className="tracking-[0.35em] text-[10px] uppercase text-accent">Beauty</span>
        </Link>
        <nav className="hidden items-center justify-center gap-10 text-[11px] uppercase tracking-[0.25em] md:flex">
          <Link to="/" activeOptions={{ exact: true }} className="text-foreground/70 transition-colors hover:text-primary" activeProps={{ className: "!text-primary" }}>Home</Link>
          <Link to="/shop" className="text-foreground/70 transition-colors hover:text-primary" activeProps={{ className: "!text-primary" }}>Shop</Link>
          <Link to="/about" className="text-foreground/70 transition-colors hover:text-primary" activeProps={{ className: "!text-primary" }}>About</Link>
          <Link to="/contact" className="text-foreground/70 transition-colors hover:text-primary" activeProps={{ className: "!text-primary" }}>Contact</Link>
        </nav>
        <div className="flex justify-end">
          <Link
            to="/shop"
            className="bg-primary px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Shop
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
