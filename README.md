# EDP Courier

Express Delivery Private Courier Service. A logistics intelligence platform for tracking, managing, and reporting on courier shipments.

## Stack

Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase (Postgres, Auth), Framer Motion, Recharts.

## Setup

1. Copy `.env.local.example` to `.env.local` and fill in your Supabase and Google Translate credentials.
2. Run `supabase/schema.sql` in your Supabase project SQL Editor.
3. Disable public signups in Supabase Auth, then create your first admin user through the Auth dashboard and insert a matching row into the `admins` table.
4. Install dependencies with `npm install` and start the dev server with `npm run dev`.

## Scripts

- `npm run dev` start the local development server
- `npm run build` create a production build
- `npm run start` run the production build
- `npm run lint` lint the project
