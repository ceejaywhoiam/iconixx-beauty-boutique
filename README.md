# TIMELESS ICONIXX Beauty

## Stripe Checkout setup

This storefront uses a TanStack Start server function to create Stripe Checkout
Sessions on the server. Product pricing is rebuilt from the app's product
catalog before the Stripe request is made, so the Stripe secret key never needs
to be exposed in the browser.

### Environment variables

Copy `.env.example` to a local env file such as `.env.local` and set:

- `STRIPE_SECRET_KEY` — your Stripe secret key. Read only on the server when
  creating Checkout Sessions and verifying sessions on the success page.
- `VITE_STRIPE_PUBLISHABLE_KEY` — the client-safe Stripe publishable key.
- `STRIPE_WEBHOOK_SECRET` — the webhook signing secret used to verify that
  incoming webhook events genuinely come from Stripe. Obtain it from the Stripe
  Dashboard (Webhooks → your endpoint → Signing secret) or from the Stripe CLI
  output when using `stripe listen` locally.
- `SUPABASE_URL` and `VITE_SUPABASE_URL` — your Supabase project URL.
- `SUPABASE_PUBLISHABLE_KEY` and `VITE_SUPABASE_PUBLISHABLE_KEY` — your
  Supabase publishable (anon) key.
- `SUPABASE_SERVICE_ROLE_KEY` — only required for server-side admin operations.

### Local development

1. Install dependencies: `npm install --no-package-lock`
2. Copy env file: `cp .env.example .env.local` and fill in your test keys.
3. Start the app: `npm run dev`
4. Add products to the bag and continue to `/cart`
5. Stripe Checkout returns customers to:
   - `/success?session_id={CHECKOUT_SESSION_ID}` on successful payment — the
     success page verifies the session with Stripe before showing confirmation.
   - `/cancel` if they cancel checkout.

### Testing Stripe webhooks locally

Use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhook
events to your local server:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

The CLI prints a webhook signing secret (`whsec_...`). Set it as
`STRIPE_WEBHOOK_SECRET` in your local env file and restart the dev server.

To trigger a test event manually:

```bash
stripe trigger checkout.session.completed
```

You can also replay events from the Stripe Dashboard (Webhooks → your endpoint →
event details → Resend). The webhook endpoint handles duplicate events
idempotently using an in-memory set of processed event IDs.

### Stripe dashboard notes

- Use test mode keys locally (`sk_test_...` and `pk_test_...`).
- Test card: `4242 4242 4242 4242`, any future expiry, any CVC/ZIP.
- Declined card: `4000 0000 0000 0002` to test failure handling.
- Make sure the domain you use for local or production testing is the same
  domain serving the app, because return URLs are derived server-side from the
  request origin.
- This checkout flow creates one-time payment sessions from the catalog defined
  in `src/lib/products.ts`.

### Webhook endpoint

`POST /api/stripe/webhook`

- Verifies the `Stripe-Signature` header using `STRIPE_WEBHOOK_SECRET`.
- Handles `checkout.session.completed` — logs session and metadata.
- Guards against duplicate delivery with an idempotency check on event IDs.
- Returns `200 {"received":true}` on success; `400` or `500` on failure.

