import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { products } from "@/lib/products";

export default defineTool({
  name: "search_products",
  title: "Search products",
  description:
    "Search the TIMELESS ICONIXX Beauty catalog by keyword across product names, taglines, descriptions, and highlights.",
  inputSchema: {
    query: z.string().trim().min(1).describe("Keyword to search for, e.g. 'matte pink'."),
    limit: z.number().int().min(1).max(25).optional().describe("Max results (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit }) => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = products
      .map((p) => {
        const haystack = [p.name, p.tagline ?? "", p.category, p.description, ...p.highlights]
          .join(" ")
          .toLowerCase();
        const score = terms.filter((t) => haystack.includes(t)).length;
        return { p, score };
      })
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit ?? 10)
      .map(({ p }) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        quantity: p.quantity,
        tagline: p.tagline,
      }));

    return {
      content: [{ type: "text", text: JSON.stringify(matches, null, 2) }],
      structuredContent: { count: matches.length, results: matches },
    };
  },
});
