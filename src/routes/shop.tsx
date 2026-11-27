import { createFileRoute } from "@tanstack/react-router";
import { createElement, useEffect, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { SiteHeader, SiteFooter } from "@/components/site-header";

const categories = [
  "All",
  "Matte Liquid Gloss",
  "Lip Gloss",
  "Lipstick",
  "Palette",
  "Mascara",
  "Liner",
  "Lashes",
  "Lip Kit",
  "LIMITED TIME BUNDLE",
] as const;

let stripeBuyButtonScript: Promise<void> | undefined;

function loadStripeBuyButton() {
  if (!stripeBuyButtonScript) {
    stripeBuyButtonScript = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/buy-button.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        script.remove();
        stripeBuyButtonScript = undefined;
        reject(new Error("Failed to load the Stripe buy button."));
      };
      document.head.appendChild(script);
    });
  }
  return stripeBuyButtonScript;
}

function LimitedTimeBundle() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    loadStripeBuyButton().then(
      () => {
        if (active) setStatus("ready");
      },
      (error: unknown) => {
        console.error("[stripe buy button]", error);
        if (active) setStatus("error");
      },
    );
    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") return <p>Loading bundle...</p>;
  if (status === "error") {
    return <p role="alert">Unable to load the bundle. Please try again later.</p>;
  }

  return createElement("stripe-buy-button", {
    "buy-button-id": "buy_btn_1UgOz5PV913oAM83K2aM6GRD",
    "publishable-key":
      "pk_live_51TdHM7PV913oAM83DCzDa38W6PPoQHU3Gd9d77e0sc8gnyIBrb6KS5h9yOmWQJlKO5w4DvIbTz6wNbYdE5tQM1jf00FoU2UOq2",
  });
}

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Shop — TIMELESS ICONIXX Beauty" },
      {
        name: "description",
        content:
          "Shop luxury matte lip glosses, palettes, mascara, liners, lashes, and lip kits from TIMELESS ICONIXX Beauty.",
      },
      { property: "og:title", content: "Shop — TIMELESS ICONIXX Beauty" },
      {
        property: "og:description",
        content:
          "The full TIMELESS ICONIXX Beauty collection: glosses, palettes, mascara, liners, lashes, and lip kits.",
      },
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
          Every piece is designed for soft luxury — velvet finishes, rich pigment, and effortless
          wear on every skin tone.
        </p>

        <div className="mt-12 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={
                "border px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] transition-colors " +
                (c === "LIMITED TIME BUNDLE"
                  ? `border-[#D4AF37] font-bold text-[#9A7100] ${c === cat ? "bg-[#D4AF37]/20" : "hover:bg-[#D4AF37]/10"}`
                  : c === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-transparent text-foreground/70 hover:border-primary hover:text-primary")
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {cat === "LIMITED TIME BUNDLE" && <LimitedTimeBundle />}
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
