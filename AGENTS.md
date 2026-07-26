# Agent Guide for Welcome-To-America

## Project Overview

This is a small, demo **Next.js 16** application named `welcome-to-america` (version 0.1.0). It presents a simple car marketplace UI called **AutoMarket** with a home page, a browsable/filterable car listing page, and dynamic car detail pages. The data is hard-coded in TypeScript, not fetched from an external API.

- **Framework:** Next.js 16.2.10 with the App Router
- **UI Library:** React 19.2.4
- **Language:** TypeScript 5 (strict mode enabled)
- **Styling:** Tailwind CSS v4 with the new `@import "tailwindcss"` entrypoint
- **Linting:** ESLint 9 with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- **Package Manager:** npm ( evidenced by `package-lock.json` )

> **Important:** This is NOT the Next.js you may be used to. Next.js 16 and React 19 introduce breaking changes (e.g., async route `params`, new Tailwind CSS v4 setup). Before adding or changing code, consult the guides in `node_modules/next/dist/docs/` and watch for deprecation notices.

## Directory Layout

```
.
├── app/                    # Next.js App Router pages
│   ├── cars/
│   │   ├── page.tsx        # Car listing (client component with filters)
│   │   └── [id]/page.tsx   # Car detail page (server component, async params)
│   ├── components/         # Empty placeholder directory for app components
│   ├── globals.css         # Tailwind import + base CSS variables
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Home / landing page
├── components/             # Shared reusable components
│   └── CarCard.tsx         # Car preview card
├── data/
│   └── cars.ts             # Car type, dataset, and formatting helpers
├── public/                 # Empty static assets directory
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
- `/cars/:id` → `app/cars/[id]/page.tsx` (detail)

### Client vs Server Components

- `app/cars/page.tsx` is a **client component** (`"use client"`) because it uses `useState` for search and brand filters.
- `app/cars/[id]/page.tsx` is a **server component**. It receives `params` as a `Promise<{ id: string }>` and must be `await`ed (this is the Next.js 16 / React 19 async params pattern).
- `app/page.tsx` and `app/layout.tsx` are server components by default.

### Data Source

All car data lives in `data/cars.ts`. There is no database, API, or authentication layer. The `Car` type and `cars` array are imported directly wherever needed. Helpers for formatting:

- `formatPrice(price)` — USD currency with no fractional digits.
- `formatMileage(mileage)` — comma-separated integer plus `mi`.

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

- **No secrets or auth:** The app has no environment variables, API keys, or authentication. No `.env` file exists.
- **External images:** Only `images.unsplash.com` is trusted. Do not widen `remotePatterns` without good reason.
- **Static data:** The car dataset is static and trusted. If you later replace it with user input or an API, add validation (e.g., Zod) before using the data.
- **Client-side state:** `app/cars/page.tsx` filters in the browser; no sensitive data is sent to or received from a server.

## Useful Files to Know

- `next.config.ts` — image remote patterns and any future Next.js options
- `postcss.config.mjs` — Tailwind CSS v4 PostCSS plugin setup
- `eslint.config.mjs` — ESLint 9 flat config using Next.js presets
- `app/globals.css` — global styles and Tailwind entrypoint
- `data/cars.ts` — single source of truth for car data and formatting helpers
- `app/layout.tsx` — root metadata, language, and body layout
