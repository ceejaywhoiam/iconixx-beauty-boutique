import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex flex-col leading-none">
          <span className="text-display text-xl text-primary">ICONIXX</span>
          <span className="tracking-luxe text-accent">Beauty</span>
        </Link>
        <nav className="hidden items-center gap-10 text-sm md:flex">
          <Link to="/" className="tracking-luxe text-foreground/70 hover:text-primary" activeOptions={{ exact: true }} activeProps={{ className: "!text-primary" }}>Home</Link>
          <Link to="/shop" className="tracking-luxe text-foreground/70 hover:text-primary" activeProps={{ className: "!text-primary" }}>Shop</Link>
          <Link to="/about" className="tracking-luxe text-foreground/70 hover:text-primary" activeProps={{ className: "!text-primary" }}>About</Link>
          <Link to="/contact" className="tracking-luxe text-foreground/70 hover:text-primary" activeProps={{ className: "!text-primary" }}>Contact</Link>
        </nav>
        <Link
          to="/shop"
          className="rounded-full bg-primary px-5 py-2 text-xs tracking-luxe text-primary-foreground transition hover:bg-primary/90"
        >
          Shop Now
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="text-display text-2xl text-primary">ICONIXX Beauty</div>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Soft luxury cosmetics for the woman who walks in confidence. Founded by CEO Shara Frison.
          </p>
        </div>
        <div>
          <div className="tracking-luxe text-accent">Explore</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-primary">Shop All</Link></li>
            <li><Link to="/about" className="hover:text-primary">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="tracking-luxe text-accent">The Iconixx List</div>
          <p className="mt-4 text-sm text-muted-foreground">
            Be the first to know about drops, restocks, and soft luxury moments.
          </p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-accent"
            />
            <button className="rounded-full bg-primary px-4 py-2 text-xs tracking-luxe text-primary-foreground hover:bg-primary/90">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ICONIXX Beauty. All rights reserved.
      </div>
    </footer>
  );
}
