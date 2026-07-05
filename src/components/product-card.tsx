import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const low = product.quantity <= 10;
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-secondary/50 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-[0.65rem] tracking-luxe text-primary backdrop-blur">
          {product.category}
        </div>
        {low && (
          <div className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[0.65rem] tracking-luxe text-accent-foreground">
            Low stock
          </div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-display text-lg text-foreground">{product.name}</h3>
          {product.tagline && (
            <p className="text-xs text-muted-foreground">{product.tagline}</p>
          )}
        </div>
        <div className="text-sm text-primary">${product.price.toFixed(2)}</div>
      </div>
    </Link>
  );
}
