import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — ICONIXX Beauty" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — ICONIXX Beauty` },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: `${product.name} — ICONIXX Beauty` },
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
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-blush/30 blur-2xl" aria-hidden />
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1024}
              className="relative w-full rounded-2xl object-cover shadow-xl"
            />
          </div>

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

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                disabled={!inStock}
                className="rounded-full bg-primary px-8 py-3 text-xs tracking-luxe text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40"
              >
                Add to Bag — ${product.price.toFixed(2)}
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
