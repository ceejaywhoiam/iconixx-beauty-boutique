import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { useCart } from "@/lib/cart";
import { ProductGallery } from "@/components/product-gallery";
import { colorMap } from "@/lib/colors";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({
  // Provide concrete params for the Start crawler so SSG/crawling succeeds.
  staticParams: () => products.map((p) => ({ id: p.id })),
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — TIMELESS ICONIXX Beauty" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — TIMELESS ICONIXX Beauty` },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: `${product.name} — TIMELESS ICONIXX Beauty` },
        { property: "og:description", content: product.description.slice(0, 155) },
        { property: "og:image", content: product.image },
        { name: "twitter:image", content: product.image },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: ProductPage,
});

function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-display text-4xl text-primary">Product not found</h1>
        <Link to="/shop" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-xs tracking-luxe text-primary-foreground hover:bg-primary/90">
          Back to shop
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const inStock = product.quantity > 0;
  const low = product.quantity <= 10;
  const { addItem, setOpen } = useCart();
  const router = useRouter();
  const shades = product.gallery ?? [];
  const hasShades = shades.length > 0;
  const [shade, setShade] = useState<string | null>(null);
  const [shadeError, setShadeError] = useState(false);

  function handleAdd(goToCart: boolean) {
    if (hasShades && !shade) {
      setShadeError(true);
      return;
    }
    addItem(product.id, 1, shade ? { shade } : undefined);
    setOpen(true);
    if (goToCart) router.navigate({ to: "/cart" });
  }


  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-xs text-muted-foreground">
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span className="mx-2">/</span>
          <span>{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-primary">{product.name}</span>
        </div>

        <div className="mt-8 grid gap-12 md:grid-cols-2">
          {product.gallery && product.gallery.length > 0 ? (
            <ProductGallery
              name={product.name}
              shades={product.gallery}
              selected={shade ?? undefined}
              onSelect={(l) => {
                setShade(l);
                setShadeError(false);
              }}
            />
          ) : (
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-blush/30 blur-2xl" aria-hidden />
              <img
                src={product.image}
                alt={product.name}
                width={1024}
                height={1024}
                className="relative aspect-square w-full rounded-2xl object-contain bg-blush/20 p-6 shadow-xl"
              />
            </div>
          )}

          <div>
            <div className="tracking-luxe text-accent">{product.category}</div>
            <h1 className="mt-2 text-display text-5xl text-primary">{product.name}</h1>
            {product.tagline && (
              <div className="mt-2 text-sm italic text-muted-foreground">{product.tagline}</div>
            )}

            <div className="mt-6 flex items-center gap-4">
              <div className="text-display text-3xl text-primary">${product.price.toFixed(2)}</div>
              {inStock ? (
                <span className={"rounded-full px-3 py-1 text-[0.65rem] tracking-luxe " + (low ? "bg-accent text-accent-foreground" : "bg-secondary text-primary")}>
                  {low ? `Only ${product.quantity} left` : "In stock"}
                </span>
              ) : (
                <span className="rounded-full bg-destructive/10 px-3 py-1 text-[0.65rem] tracking-luxe text-destructive">Sold out</span>
              )}
            </div>
            {product.quantityNote && (
              <p className="mt-2 text-xs text-muted-foreground">{product.quantityNote}</p>
            )}

            <p className="mt-8 leading-relaxed text-foreground/80">{product.description}</p>

            {product.highlights.length > 0 && (
              <ul className="mt-8 grid gap-2 border-t border-border pt-6 sm:grid-cols-2">
                {product.highlights.map((h: string) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-1 text-accent">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {hasShades && (
              <div className="mt-8 border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-primary">
                    Shade{shade ? ":" : ""} <span className="text-muted-foreground normal-case tracking-normal">{shade ?? ""}</span>
                  </div>
                  {!shade && (
                    <span className="text-[11px] text-muted-foreground">Please select a shade</span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {shades.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => {
                        setShade(s.label);
                        setShadeError(false);
                      }}
                      aria-pressed={shade === s.label}
                      className={
                        "flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] transition " +
                        (shade === s.label
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/60")
                      }
                    >
                      <span
                        className="inline-block h-3 w-3 rounded-full border border-border/60"
                        style={{ backgroundColor: colorMap[s.label] ?? "transparent" }}
                        aria-hidden
                      />
                      {s.label}
                    </button>
                  ))}
                </div>
                {shadeError && (
                  <p className="mt-3 text-[11px] text-destructive">
                    Choose a shade before adding to your bag.
                  </p>
                )}
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => handleAdd(false)}
                disabled={!inStock}
                className="rounded-full bg-primary px-8 py-3 text-xs tracking-luxe text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40"
              >
                Add to Bag — ${product.price.toFixed(2)}
              </button>
              <button
                onClick={() => handleAdd(true)}
                disabled={!inStock}
                className="rounded-full border border-primary/40 px-8 py-3 text-xs tracking-luxe text-primary transition hover:bg-primary hover:text-primary-foreground disabled:opacity-40"
              >
                Buy now
              </button>
              <Link to="/shop" className="rounded-full border border-primary/30 px-8 py-3 text-xs tracking-luxe text-primary hover:bg-primary hover:text-primary-foreground">
                Continue shopping
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <div className="tracking-luxe text-accent">You may also love</div>
            <h2 className="mt-2 text-display text-3xl text-primary">More from {product.category}</h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
