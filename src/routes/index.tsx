import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = products.slice(0, 4);
  const glosses = products.filter((p) => p.category === "Gloss");

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="tracking-luxe text-accent">ICONIXX Beauty — Est. by Shara Frison</div>
            <h1 className="mt-6 text-display text-5xl leading-[1.05] text-primary md:text-7xl">
              Soft luxury, worn like a signature.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              Velvet-matte lip glosses, buttery palettes, and precision liners crafted for
              the woman who walks in confidence and leaves an impression.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/shop" className="rounded-full bg-primary px-7 py-3 text-xs tracking-luxe text-primary-foreground transition hover:bg-primary/90">
                Shop the Collection
              </Link>
              <Link to="/about" className="rounded-full border border-primary/30 px-7 py-3 text-xs tracking-luxe text-primary hover:bg-primary hover:text-primary-foreground">
                Our Story
              </Link>
            </div>
            <div className="mt-14 flex gap-10 text-xs tracking-luxe text-muted-foreground">
              <div><span className="text-accent">10+</span> signature shades</div>
              <div><span className="text-accent">Cruelty</span> free</div>
              <div><span className="text-accent">Made</span> for every tone</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-blush/40 blur-3xl" aria-hidden />
            <img
              src={hero}
              alt="ICONIXX Beauty luxury cosmetics on blush silk"
              width={1600}
              height={1100}
              className="relative rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <div className="tracking-luxe text-accent">Featured</div>
            <h2 className="mt-3 text-display text-4xl text-primary md:text-5xl">The It-Girl Essentials</h2>
          </div>
          <Link to="/shop" className="hidden text-xs tracking-luxe text-primary hover:text-accent md:block">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Gloss series banner */}
      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <div className="tracking-luxe text-accent">The Matte Series</div>
            <h2 className="mt-3 text-display text-4xl text-primary md:text-5xl">
              Five shades. One iconic finish.
            </h2>
            <p className="mt-4 text-muted-foreground">
              A curated collection of velvet-matte glosses — from soft baby pink to rich mauve nude.
              Highly pigmented, lightweight, and made for every tone.
            </p>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {glosses.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Ethos */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="tracking-luxe text-accent">The Iconixx Ethos</div>
        <p className="mt-6 text-display text-3xl leading-snug text-primary md:text-4xl">
          "Beauty isn't loud. It's confident, feminine, and unforgettable —
          the kind of glow that walks into the room before you do."
        </p>
        <div className="mt-6 text-xs tracking-luxe text-muted-foreground">— Shara Frison, Founder & CEO</div>
      </section>

      <SiteFooter />
    </div>
  );
}
