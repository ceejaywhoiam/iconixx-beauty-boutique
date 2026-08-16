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
  const glosses = products.filter((p) => p.category === "Lip Gloss");
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
            className="h-full w-full object-contain object-center"
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
          <p className="mt-8 inline-block bg-background/60 backdrop-blur-sm px-3 py-1 rounded-md text-[12px] uppercase tracking-[0.35em] font-medium text-primary-foreground drop-shadow-md">
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
                className="aspect-square w-full object-contain object-center shadow-2xl md:aspect-video"
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
                    className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
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
      <section className="relative overflow-hidden px-8 py-32">
        <div className="relative mx-auto max-w-4xl space-y-12 text-center">
          <div className="flex justify-center">
            <svg
              className="h-12 w-12 text-blush"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-3.999v-10h9.982z" />
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
