import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const badge =
    product.quantity === 0
      ? { text: "Coming soon", tone: "muted" as const }
      : product.quantity <= 10
        ? { text: "Low stock", tone: "accent" as const }
        : { text: product.category, tone: "category" as const };
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-blush/60">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={
            "absolute right-4 top-4 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] " +
            (badge.tone === "accent"
              ? "text-primary"
              : badge.tone === "muted"
                ? "text-muted-foreground"
                : "text-foreground")
          }
        >
          {badge.text}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xs uppercase tracking-[0.25em] font-medium text-foreground">
          {product.name}
        </h3>
        {product.tagline && (
          <p className="mt-1 text-[11px] text-muted-foreground">{product.tagline}</p>
        )}
        <p className="mt-3 text-lg font-light text-primary">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
