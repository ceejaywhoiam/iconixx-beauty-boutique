const RAW_ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS ??
  "http://localhost:5173,http://127.0.0.1:5173";

export const ALLOWED_ORIGINS: string[] = RAW_ALLOWED_ORIGINS.split(",")
  .map((o) => o.trim())
  .filter(Boolean);

export function isAllowedOrigin(origin?: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

export function assertAllowedOrigin(origin?: string | null): void {
  if (!isAllowedOrigin(origin)) {
    const err = new Error("Invalid origin") as Error & { statusCode?: number };
    err.statusCode = 403;
    throw err;
  }
}
