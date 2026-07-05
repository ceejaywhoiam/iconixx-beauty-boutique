import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { SiteHeader, SiteFooter } from "@/components/site-header";

const categories = ["All", "Gloss", "Lipstick", "Palette", "Mascara", "Liner"] as const;

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — ICONIXX Beauty" },
      { name: "description", content: "Shop luxury matte lip glosses, palettes, mascara, and liners from ICONIXX Beauty." },
      { property: "og:title", content: "Shop — ICONIXX Beauty" },
      { property: "og:description", content: "The full ICONIXX Beauty collection: glosses, palettes, mascara, and liners." },
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
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="tracking-luxe text-accent">The Collection</div>
        <h1 className="mt-3 text-display text-5xl text-primary md:text-6xl">Shop ICONIXX</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Every piece is designed for soft luxury — velvet finishes, rich pigment, and
          effortless wear on every skin tone.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={
                "rounded-full border px-4 py-2 text-xs tracking-luxe transition " +
                (c === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/70 hover:border-primary hover:text-primary")
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
