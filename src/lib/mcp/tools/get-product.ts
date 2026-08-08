import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { products } from "@/lib/products";

export default defineTool({
  name: "get_product",
  title: "Get product details",
  description:
    "Get full details for one TIMELESS ICONIXX Beauty product: description, highlights, price, stock, image, and shades.",
  inputSchema: {
    id: z.string().trim().min(1).describe("Product id, e.g. 'pink-dynasty'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const key = id.toLowerCase();
    const product =
      products.find((p) => p.id === key) ??
      products.find((p) => p.name.toLowerCase() === key);

    if (!product) {
      throw new ToolError(
        `No product found with id or name "${id}". Use list_products to see available ids.`,
      );
    }

    return {
      content: [{ type: "text", text: JSON.stringify(product, null, 2) }],
      structuredContent: { product },
    };
  },
});
