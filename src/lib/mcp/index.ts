import { defineMcp } from "@lovable.dev/mcp-js";
import listProducts from "./tools/list-products";
import getProduct from "./tools/get-product";
import searchProducts from "./tools/search-products";

export default defineMcp({
  name: "iconixx-beauty-launch",
  title: "ICONIXX Beauty Launch",
  version: "0.1.0",
  instructions:
    "Tools for the TIMELESS ICONIXX Beauty storefront. Use `list_products` to browse the catalog, `search_products` to find products by keyword, and `get_product` for full details on a single item.",
  tools: [listProducts, searchProducts, getProduct],
});
