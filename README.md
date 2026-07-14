# Property Registry — MVP

A production-quality **MVP property registry platform**: users search property
records by postcode or address, view property details, purchase official-style
title documents, and download them as PDFs. Includes a full **admin dashboard**
for managing properties, images, documents, orders and users.

> ⚠️ **Demonstration only.** This is an independent MVP. It is **not affiliated
> with, owned or operated by HM Land Registry or the UK Government**. All
> property data is **sample data**. The official title-copy fee at
> [gov.uk](https://www.gov.uk/get-information-about-property-and-land) is £3.

The UI is inspired by the look and feel of UK land-registry document services
(deep navy + lime-green, a 3-step checkout wizard, trust/reviews strip, FAQ
accordion), built under its own neutral brand.

## Tech stack

| Concern        | Choice                                        |
| -------------- | --------------------------------------------- |
| Framework      | Next.js 15 (App Router, Server Actions)       |
| Language       | TypeScript (strict)                           |
| Styling        | Tailwind CSS + shadcn/ui-style components      |
| Database       | PostgreSQL + Prisma ORM                        |
| Auth           | Clerk (feature-flagged — see below)            |
| Payments       | Stripe (with a no-key "demo mode")             |
| File storage   | Local disk in dev, swappable to AWS S3         |

## Feature flags (run before configuring anything)

The app is designed to **boot and work end-to-end with zero third-party keys**,
so you can deploy first and wire up services incrementally:

- **Auth** — with no Clerk keys, the app runs in **local demo mode** with a
  single signed-in admin user, so every page (including `/admin`) is
  explorable. Add Clerk keys to switch on real sign-up / sign-in.
- **Payments** — with no Stripe keys, checkout runs in **demo mode**: orders
  are marked paid instantly so the download flow works. Add Stripe keys to take
  real card payments via Stripe Checkout.
- **Storage** — `STORAGE_DRIVER=local` (default) stores uploads under
  `./storage`. Set `STORAGE_DRIVER=s3` and implement `S3StorageDriver` in
  `lib/storage.ts` to move to AWS S3 — no call sites change.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
#   Set DATABASE_URL at minimum. Leave Clerk/Stripe blank for demo mode.

# 3. Create the schema and seed sample data
npm run db:migrate
npm run db:seed

# 4. Run the app
npm run dev      # http://localhost:3000
```

## Pages

| Route                        | Description                                        |
| ---------------------------- | -------------------------------------------------- |
| `/`                          | Landing page (hero search, features, docs, FAQ)    |
| `/search?q=`                 | Search results (postcode / address / registry no.) |
| `/property/[id]`             | Property details + document purchase panel         |
| `/checkout`                  | 3-step checkout wizard                              |
| `/checkout/success`          | Order confirmation + downloads                     |
| `/dashboard`                 | User: overview, documents, searches, profile       |
| `/admin`                     | Admin: properties CRUD, orders, users              |
| `/sign-in`, `/sign-up`       | Clerk auth (or demo notice)                         |

## Data model (Prisma)

Core tables: `users`, `properties`, `property_images`, `documents`, `orders`
(plus a small `search_logs` table powering the "previous searches" feature).

## Enabling real services

### Clerk (authentication)

1. Create a Clerk application and copy the publishable + secret keys into `.env`.
2. Add users' emails to `ADMIN_EMAILS` to grant the admin role on first login.
3. (Optional) Configure a Clerk webhook to `POST /api/webhooks/clerk` with
   `CLERK_WEBHOOK_SECRET` to keep the local user table in sync.

### Stripe (payments)

1. Set `STRIPE_SECRET_KEY` (and publishable key) in `.env`.
2. Add a webhook to `POST /api/webhooks/stripe` for `checkout.session.completed`
   and set `STRIPE_WEBHOOK_SECRET`. (The success page also verifies the session
   as a fallback, so it works even before the webhook is configured.)

### AWS S3 (storage)

Set `STORAGE_DRIVER=s3`, provide the `AWS_*` / `S3_BUCKET` vars, install
`@aws-sdk/client-s3`, and implement `S3StorageDriver` in `lib/storage.ts`.

## Scripts

```bash
npm run dev         # start dev server
npm run build       # prisma generate + next build
npm run start       # start production server
npm run typecheck   # tsc --noEmit
npm run db:migrate  # prisma migrate dev
npm run db:seed     # seed sample properties & documents
npm run db:studio   # open Prisma Studio
```

## Security notes

- Document PDFs are **never** publicly served — downloads go through
  `/api/documents/[id]/download`, which requires a **paid order** for that
  document owned by the signed-in user.
- The public file route (`/api/storage/[...key]`) only serves the `images/`
  prefix; document keys are excluded.
- Local storage access is guarded against path traversal.
