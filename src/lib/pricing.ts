export const SALE_DISCOUNT_PERCENT = 10;
export const SALE_END_TIMESTAMP = Date.parse("2026-12-01T00:00:00Z");

export function isSaleActive(now = Date.now()) {
  return now < SALE_END_TIMESTAMP;
}

export function getSalePrice(price: number, saleActive = isSaleActive()) {
  const priceInCents = Math.round(price * 100);
  return (
    (saleActive ? Math.round((priceInCents * (100 - SALE_DISCOUNT_PERCENT)) / 100) : priceInCents) /
    100
  );
}
