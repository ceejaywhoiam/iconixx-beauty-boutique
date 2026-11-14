import type { Product } from "./products";

export function getProductSelection(product: Product, options?: Record<string, string>) {
  const shade = options?.shade;
  const selected = product.gallery?.find((entry) => entry.label === shade);
  return {
    shade,
    name: shade ? `${product.name} — ${shade}` : product.name,
    image: selected?.image ?? product.image,
    metadata: {
      product_id: product.id,
      category: product.category,
      ...(shade ? { shade } : {}),
    },
  };
}