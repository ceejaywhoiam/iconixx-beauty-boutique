import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { products } from "@/lib/products";

const CATEGORIES = [
  "Gloss",
  "Lipstick",
  "Palette",
  "Mascara",
  "Liner",
  "Lashes",
  "Lip Kit",
] as const;

export default defineTool({
  name: "list_products",
  title: "List products",
  description:
    "List the TIMELESS ICONIXX Beauty product catalog with names, categories, prices, and stock counts. Optionally filter by category or in-stock only.",
  inputSchema: {
    category: z
      .enum(CATEGORIES)
      .optional()
      .describe("Only return products in this category."),
    inStockOnly: z
      .boolean()
      .optional()
      .describe("When true, only return products with quantity greater than zero."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, inStockOnly }) => {
    const items = products
      .filter((p) => (category ? p.category === category : true))
      .filter((p) => (inStockOnly ? p.quantity > 0 : true))
      .map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        quantity: p.quantity,
        inStock: p.quantity > 0,
      }));

    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, products: items },
    };
  },
});
