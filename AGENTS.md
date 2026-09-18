# Agent Guide for Welcome-To-America

## Project Overview

This is a small, demo **Next.js 16** application named `welcome-to-america` (version 0.1.0). It presents a car marketplace UI called **AutoMarket** with a home page, a browsable/filterable car listing page, dynamic car detail pages (with a "Similar Cars" section), and an admin panel for managing car listings. Car data lives in **MongoDB** (accessed via Mongoose) behind API routes.

- **Framework:** Next.js 16.2.10 with the App Router
- **UI Library:** React 19.2.4
- **Language:** TypeScript 5 (strict mode enabled)
- **Styling:** Tailwind CSS v4 with the new `@import "tailwindcss"` entrypoint
- **Linting:** ESLint 9 with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- **Database:** MongoDB via Mongoose 9 (`lib/db.ts` caches the connection; `MONGODB_URI` in `.env`)
- **Auth:** Custom email/password accounts (`models/User.ts`, bcryptjs-hashed passwords) with JWT session cookies (jose, `AUTH_SECRET` in `.env`). Sign-up is open to anyone. In Next.js 16, route guarding is done in `proxy.ts` (Middleware was renamed to Proxy).
- **Package Manager:** npm (evidenced by `package-lock.json`)

> **Important:** This is NOT the Next.js you may be used to. Next.js 16 and React 19 introduce breaking changes (e.g., async route `params`, new Tailwind CSS v4 setup). Before adding or changing code, consult the guides in `node_modules/next/dist/docs/` and watch for deprecation notices.

## Directory Layout

```
.
├── app/                    # Next.js App Router pages
│   ├── admin/cars/         # Admin panel (client components; guarded by proxy.ts)
│   ├── api/                # API routes (cars CRUD, auth, seed)
│   ├── cars/
│   │   ├── page.tsx        # Car listing (client component with filters)
│   │   └── [id]/page.tsx   # Car detail page (server component, similar cars)
│   ├── login/ signup/      # Auth pages
│   ├── globals.css         # Tailwind import + base CSS variables
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Home / landing page
├── components/             # Shared reusable components (Navbar, CarCard, ...)
├── data/cars.ts            # Car type, seed dataset, formatting helpers
├── lib/                    # db connection (db.ts), auth helpers (auth.ts), serializers
├── models/                 # Mongoose models (Car.ts, User.ts)
├── proxy.ts                # Next.js 16 Proxy: guards /admin/* and write APIs
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration (TypeScript)
├── tsconfig.json           # TypeScript configuration
├── postcss.config.mjs      # PostCSS configuration for Tailwind CSS v4
├── eslint.config.mjs       # ESLint flat config
├── package.json            # Dependencies and npm scripts
├── AGENTS.md               # This file
└── CLAUDE.md               # Points to AGENTS.md
```

## npm Scripts

Run these from the project root:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js development server (Turbopack by default in Next.js 16) |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server (requires a build first) |
| `npm run lint` | Run ESLint across the project |

There is no test runner configured. The project currently has no test files.

## Architecture & Runtime Notes

### App Router

Routing is file-system based under `app/`:

- `/` → `app/page.tsx` (home page)
- `/cars` → `app/cars/page.tsx` (listing)
- `/cars/:id` → `app/cars/[id]/page.tsx` (detail, with similar cars)
- `/admin/cars` → `app/admin/cars/page.tsx` (requires sign-in; shows only the signed-in user's cars)
- `/login`, `/signup` → auth pages
- `/api/cars`, `/api/cars/:id`, `/api/cars/mine`, `/api/auth/*`, `/api/seed` → API routes

### Client vs Server Components

- `app/cars/page.tsx` and everything under `app/admin/cars/` are **client components** (`"use client"`) because they use `useState`/`useEffect` for filters and data fetching.
- `app/cars/[id]/page.tsx` is a **server component**. It receives `params` as a `Promise<{ id: string }>` and must be `await`ed (this is the Next.js 16 / React 19 async params pattern). It queries MongoDB directly.
- `app/page.tsx`, `app/layout.tsx`, and `components/Navbar.tsx` are server components by default. `Navbar` is async and reads the session via `getSessionUser()` from `lib/auth.ts`.

### Data Source

Car data lives in **MongoDB** via Mongoose (`models/Car.ts`), served by API routes and serialized with `lib/serialize.ts`. `data/cars.ts` still holds the `Car` type, the seed dataset (`seedCars`, used by `/api/seed`), and formatting helpers:

- `formatPrice(price)` — USD currency with no fractional digits.
- `formatMileage(mileage)` — comma-separated integer plus `mi`.

### Authentication & Authorization

- Sign-up (`POST /api/auth/signup`) is open to anyone; passwords are hashed with bcryptjs.
- Sessions are JWTs (jose, HS256) in an HttpOnly `session` cookie, signed with `AUTH_SECRET`, 7-day expiry. Helpers live in `lib/auth.ts`.
- `proxy.ts` (Next.js 16's replacement for Middleware) guards `/admin/:path*` (redirects guests to `/login`) and write methods on `/api/cars/:path*` and `/api/seed` (returns 401). `GET /api/cars` stays public.
- Route handlers also re-check the session (defense in depth) and enforce ownership: cars have an `owner` field (user id); users can only list, update, and delete their own cars (`GET /api/cars/mine`, 403 otherwise).

### Images

The project uses `next/image` with remote images from `images.unsplash.com`. That hostname is explicitly allow-listed in `next.config.ts`:

```ts
images: {
  remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
}
```

If you add more external image sources, update `remotePatterns` or images will fail to load.

## Code Style Guidelines

- **TypeScript:** Strict mode is on. Provide explicit types for props and avoid implicit `any`.
- **Imports:** Use the `@/*` path alias for project imports (e.g., `import { cars } from "@/data/cars"`). It is configured in `tsconfig.json`.
- **React 19 / Next.js 16:**
  - Dynamic route pages must await `params` (e.g., `const { id } = await params`).
  - Use `next/image` for all external images and respect `next.config.ts` remote patterns.
  - Use `next/link` for navigation instead of raw `<a>` tags.
- **Tailwind CSS v4:** The global stylesheet is `app/globals.css`. It imports Tailwind via `@import "tailwindcss";`. Do not add a `tailwind.config.js` file unless you intentionally switch to the legacy v3 setup.
- **Formatting:** The existing code uses 2-space indentation. Try to match this style in new files.

## Testing Instructions

There is currently no test framework installed and no test files. If you add tests, prefer a setup consistent with the Next.js ecosystem (for example, Jest + React Testing Library or Vitest). Update `package.json` scripts accordingly and add a short note here.

## Security Considerations

- **Secrets:** `.env` holds `MONGODB_URI` and `AUTH_SECRET` and is gitignored (`.env*` is covered by `.gitignore`); `.env.example` documents the required variables without values. Never commit real secrets.
- **Auth:** Sessions are HttpOnly JWT cookies; passwords are bcrypt-hashed. The proxy guards admin pages and write APIs, and route handlers re-verify the session and car ownership. GET endpoints that serve the public marketplace remain open.
- **External images:** Only `images.unsplash.com` is trusted. Do not widen `remotePatterns` without good reason. Note: user-submitted car image URLs are stored and rendered via `next/image`; because any signed-in user can create listings, treat image URLs as untrusted input.
- **User input:** API routes validate required fields but do not yet use a schema validator (e.g., Zod). Add one before expanding the API surface.

## Useful Files to Know

- `next.config.ts` — image remote patterns and any future Next.js options
- `postcss.config.mjs` — Tailwind CSS v4 PostCSS plugin setup
- `eslint.config.mjs` — ESLint 9 flat config using Next.js presets
- `app/globals.css` — global styles and Tailwind entrypoint
- `data/cars.ts` — Car type, seed dataset, and formatting helpers
- `lib/db.ts` — cached Mongoose connection; `lib/auth.ts` — session/password helpers; `lib/serialize.ts` — Mongo → JSON serializers
- `models/Car.ts`, `models/User.ts` — Mongoose schemas (Car has an `owner` field)
- `proxy.ts` — route guarding (Next.js 16 Proxy)
- `app/layout.tsx` — root metadata, language, and body layout
