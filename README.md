# TIMELESS ICONIXX Beauty

## Stripe Checkout setup

This storefront uses a TanStack Start server function to create Stripe Checkout
Sessions on the server. Product pricing is rebuilt from the app's product
catalog before the Stripe request is made, so the Stripe secret key never needs
to be exposed in the browser.

### Environment variables

Copy `.env.example` to a local env file such as `.env.local` and set:

- `STRIPE_SECRET_KEY` — your Stripe secret key. This is read only on the server
  when creating Checkout Sessions.
- `VITE_STRIPE_PUBLISHABLE_KEY` — the client-safe Stripe publishable key used to
  enable the checkout button in the storefront.

### Local development

1. Install dependencies: `npm install --no-package-lock`
2. Start the app: `npm run dev`
3. Add products to the bag and continue to `/cart`
4. Stripe Checkout returns customers to:
   - `/success?session_id={CHECKOUT_SESSION_ID}` on successful payment
   - `/cancel` if they cancel checkout

### Stripe dashboard notes

- Use test mode keys locally (`sk_test_...` and `pk_test_...`).
- Make sure the domain you use for local or production testing is the same
  domain serving the app, because return URLs are derived server-side from the
  request origin.
- This checkout flow creates one-time payment sessions from the catalog defined
  in `src/lib/products.ts`.