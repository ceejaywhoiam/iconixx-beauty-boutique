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
  const bandImage = glosses[0]?.image ?? featured[0]?.image;

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-accent-foreground">
      <SiteHeader />

      {/* Hero — centered editorial */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="TIMELESS ICONIXX Beauty campaign"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background/80" />
        </div>

        <div className="relative z-10 px-6 text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-primary">
            Est. by Shara Frison
          </div>
          <h1
            className="mt-6 text-6xl leading-none text-primary drop-shadow-sm md:text-9xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            TIMELESS ICONIXX
          </h1>
          <p className="mt-8 text-[11px] uppercase tracking-[0.4em] font-light text-foreground">
            Redefining the standard of elegance
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="bg-primary px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Shop the collection
            </Link>
            <Link
              to="/about"
              className="border border-primary px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured — The Essentials */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2
              className="text-4xl text-primary md:text-5xl"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              The Essentials
            </h2>
            <div className="mt-4 h-1 w-24 bg-blush" />
          </div>
          <Link
            to="/shop"
            className="border-b border-primary pb-1 text-[11px] uppercase tracking-[0.3em] text-primary transition-colors hover:border-accent hover:text-accent"
          >
            View all products
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Collection band — Matte Series */}
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 md:flex-row md:px-8">
          <div className="w-full md:w-1/2">
            {bandImage && (
              <img
                src={bandImage}
                alt="The Matte Series"
                className="aspect-square w-full object-cover shadow-2xl md:aspect-video"
              />
            )}
          </div>
          <div className="w-full space-y-8 md:w-1/2">
            <div className="text-[10px] uppercase tracking-[0.35em] text-blush">
              Exclusive Drop
            </div>
            <h2
              className="text-4xl leading-tight md:text-6xl"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              The Matte Series Evolution
            </h2>
            <p className="max-w-lg text-base font-light leading-relaxed text-primary-foreground/80 md:text-lg">
              Five signature shades, engineered for velvet-matte wear from
              baby-pink brunch to rich mauve after hours. Highly pigmented,
              featherlight, made for every tone.
            </p>
            <Link
              to="/shop"
              className="inline-block border border-primary-foreground px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
            >
              Shop the Series
            </Link>
          </div>
        </div>

        {/* Gloss grid inside band */}
        <div className="mx-auto mt-20 max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {glosses.map((p) => (
              <Link
                key={p.id}
                to="/product/$id"
                params={{ id: p.id }}
                className="group block"
              >
                <div className="aspect-[4/5] overflow-hidden bg-blush/40">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-primary-foreground">
                  {p.name}
                </div>
                <div className="mt-1 text-sm font-light text-blush">
                  ${p.price.toFixed(2)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ethos — over subtle texture */}
      <section
        className="relative overflow-hidden px-8 py-32"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(232,138,171,0.14), transparent 55%), radial-gradient(circle at 80% 60%, rgba(248,200,216,0.35), transparent 60%), repeating-linear-gradient(45deg, rgba(196,92,124,0.05) 0 2px, transparent 2px 12px)",
        }}
      >
        <div className="relative mx-auto max-w-4xl space-y-12 text-center">
          <div className="flex justify-center">
            <svg
              className="h-12 w-12 text-blush"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V5C14.017 4.44772 14.4647 4 15.017 4H19.017C20.6739 4 22.017 5.34315 22.017 7V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91238 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 7.55228 3.017 7V5C3.017 4.44772 3.46472 4 4.017 4H8.017C9.67386 4 11.017 5.34315 11.017 7V15C11.017 18.3137 8.33071 21 5.017 21H3.017Z" />
            </svg>
          </div>
          <blockquote
            className="text-3xl leading-tight text-foreground md:text-5xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Beauty is an expression of self-love — a signature we wear every
            single day. We don't just sell cosmetics; we empower confidence.
          </blockquote>
          <div className="flex flex-col items-center space-y-2">
            <cite className="not-italic text-sm font-medium uppercase tracking-[0.3em] text-primary">
              Shara Frison
            </cite>
            <span className="text-[10px] font-light uppercase tracking-[0.35em] text-muted-foreground">
              CEO & Founder
            </span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
