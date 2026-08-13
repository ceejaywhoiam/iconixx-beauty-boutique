import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { SiteHeader, SiteFooter } from "@/components/site-header";

const categories = ["All", "Matte Liquid Gloss", "Lip Gloss", "Lipstick", "Palette", "Mascara", "Liner", "Lashes", "Lip Kit"] as const;

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — TIMELESS ICONIXX Beauty" },
      { name: "description", content: "Shop luxury matte lip glosses, palettes, mascara, liners, lashes, and lip kits from TIMELESS ICONIXX Beauty." },
      { property: "og:title", content: "Shop — TIMELESS ICONIXX Beauty" },
      { property: "og:description", content: "The full TIMELESS ICONIXX Beauty collection: glosses, palettes, mascara, liners, lashes, and lip kits." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const filtered = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="text-[10px] uppercase tracking-[0.4em] text-accent">The Collection</div>
        <h1
          className="mt-4 text-5xl text-primary md:text-7xl"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Shop TIMELESS ICONIXX
        </h1>
        <div className="mt-4 h-1 w-24 bg-blush" />
        <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-muted-foreground">
          Every piece is designed for soft luxury — velvet finishes, rich pigment,
          and effortless wear on every skin tone.
        </p>

        <div className="mt-12 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={
                "border px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] transition-colors " +
                (c === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-transparent text-foreground/70 hover:border-primary hover:text-primary")
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
