import { createMiddleware } from "@tanstack/react-start";
import { getHeader, setResponseHeader } from "@tanstack/react-start/server";
import { isAllowedOrigin } from "@/lib/origin";

export const corsMiddleware = createMiddleware().server(async ({ next, request }) => {
  const origin = request.headers.get("origin");

  if (origin && isAllowedOrigin(origin)) {
    setResponseHeader("Access-Control-Allow-Origin", origin);
    setResponseHeader("Vary", "Origin");
    setResponseHeader("Access-Control-Allow-Credentials", "true");
    setResponseHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Stripe-Signature",
    );
    setResponseHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    );
  }

  // Handle OPTIONS preflight
  if (request.method === "OPTIONS") {
    const status = origin && isAllowedOrigin(origin) ? 204 : 403;
    return new Response(null, { status });
  }

  return next();
});
