import { useEffect, useState } from "react";
import { isSaleActive, SALE_END_TIMESTAMP } from "@/lib/pricing";

export function useSaleActive() {
  const [saleActive, setSaleActive] = useState(isSaleActive);

  useEffect(() => {
    if (!saleActive) return;
    const timeout = window.setTimeout(
      () => setSaleActive(false),
      Math.max(0, SALE_END_TIMESTAMP - Date.now()),
    );
    return () => window.clearTimeout(timeout);
  }, [saleActive]);

  return saleActive;
}
