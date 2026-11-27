import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { getProduct } from "./products";
import { getProductSelection } from "./product-selection";

describe("selected mascara shade", () => {
  for (const [shade, image] of [
    ["Black", "https://ik.imagekit.io/jodiplease/mascara_OoKUumeo7.png"],
    ["Gold", "https://ik.imagekit.io/jodiplease/mascara-gold.png"],
  ]) {
    test(`${shade} photo is used in the bag and checkout`, () => {
      const product = getProduct("timeless-mascara");
      if (!product) throw new Error("Missing mascara product");
      assert.equal(getProductSelection(product, { shade }).image, image);
    });
    test(`${shade} is carried into the Stripe name and metadata`, () => {
      const product = getProduct("timeless-mascara");
      if (!product) throw new Error("Missing mascara product");
      const selection = getProductSelection(product, { shade });
      assert.equal(selection.name, `The Timeless Collection — ${shade}`);
      assert.deepEqual(selection.metadata, {
        product_id: "timeless-mascara",
        category: "Mascara",
        shade,
      });
    });
  }
});
