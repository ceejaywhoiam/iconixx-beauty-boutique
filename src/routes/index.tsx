import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { getSalePrice } from "@/lib/pricing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TIMELESS ICONIXX Beauty — Luxury Cosmetics" },
      {
        name: "description",
        content:
          "Shop TIMELESS ICONIXX Beauty glosses, palettes, mascara, and lip kits by Shara Frison.",
      },
      { property: "og:title", content: "TIMELESS ICONIXX Beauty — Luxury Cosmetics" },
      {
        property: "og:description",
        content:
          "Discover luxury cosmetics by Shara Frison, from lip glosses to palettes and mascara.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 4);
  const glosses = products.filter((p) => p.category === "Lip Gloss");
  const bandImage = glosses[0]?.image ?? featured[0]?.image;

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-accent-foreground">
      <SiteHeader />

      {/* Hero — full-bleed beauty campaign */}
      <section className="relative isolate flex min-h-[82svh] items-center overflow-hidden bg-plum">
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="TIMELESS ICONIXX Beauty campaign"
            className="h-full w-full object-cover object-[58%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-plum/85 via-plum/55 to-plum/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-plum/35 via-transparent to-plum/10" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-8">
          <div className="max-w-3xl text-left">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-blush">
              <span className="h-px w-10 bg-blush/80" />
              Est. by Shara Frison
            </div>
            <h1
              className="mt-8 text-[clamp(4rem,10vw,9rem)] leading-[0.8] tracking-[-0.045em] text-background drop-shadow-sm"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              <span className="block">TIMELESS</span>
              <span className="mt-3 block text-blush">ICONIXX</span>
            </h1>
            <div className="mt-7 flex items-center gap-4 text-[11px] uppercase tracking-[0.55em] text-background">
              <span>Beauty</span>
              <span className="h-px w-16 bg-background/70" />
            </div>
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-background/90 md:text-base">
              Redefining the standard of elegance.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="bg-background px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-plum transition-colors hover:bg-blush"
              >
                Shop the collection
              </Link>
              <Link
                to="/about"
                className="border border-background/80 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-background transition-colors hover:bg-background hover:text-plum"
              >
                Our Story
              </Link>
            </div>
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
            <div className="text-[10px] uppercase tracking-[0.35em] text-blush">Exclusive Drop</div>
            <h2
              className="text-4xl leading-tight md:text-6xl"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              The Matte Series Evolution
            </h2>
            <p className="max-w-lg text-base font-light leading-relaxed text-primary-foreground/80 md:text-lg">
              Five signature shades, engineered for velvet-matte wear from baby-pink brunch to rich
              mauve after hours. Highly pigmented, featherlight, made for every tone.
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
            {glosses.map((p) => {
              const salePrice = getSalePrice(p.price);
              return (
                <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="group block">
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
                  <div className="mt-1 flex items-baseline gap-2 text-sm font-light text-blush">
                    ${salePrice.toFixed(2)}
                    {salePrice < p.price && (
                      <del className="text-xs text-primary-foreground/60">
                        ${p.price.toFixed(2)}
                      </del>
                    )}
                  </div>
                </Link>
              );
            })}
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
            Beauty is an expression of self-love — a signature we wear every single day. We don't
            just sell cosmetics; we empower confidence.
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
