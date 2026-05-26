# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Syukran Travel — a Next.js 16 website built on Payload CMS 3.84 with SQLite (via `@payloadcms/db-sqlite`). Uses the Payload Website Template as a foundation. The Payload admin panel and the frontend share the same Next.js app.

This project uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs.

## Commands

```bash
pnpm dev              # Start dev server (Next.js + Payload admin at localhost:3000)
pnpm build            # Production build (also generates sitemap via next-sitemap)
pnpm lint             # ESLint (next/core-web-vitals + next/typescript)
pnpm lint:fix         # ESLint with auto-fix
pnpm generate:types   # Regenerate payload-types.ts from collection/global configs
pnpm generate:importmap  # Regenerate Payload admin import map

# Testing
pnpm test             # Run all tests (integration + e2e)
pnpm test:int         # Vitest integration tests only (tests/int/**/*.int.spec.ts)
pnpm test:e2e         # Playwright e2e tests only (tests/e2e/)
```

## Architecture

### Route Groups
- `src/app/(frontend)/` — Public-facing pages (Next.js App Router). Pages use `[slug]` dynamic routes resolved from the Payload `pages` collection.
- `src/app/(payload)/` — Payload admin panel (`/admin`) and API routes (`/api`, `/api/graphql`).

### Payload Config
- **Collections**: Pages, Posts, Tours, Media, Categories, TourCategories, Users — defined in `src/collections/`.
- **Globals**: Header, Footer — defined in `src/Header/config.ts` and `src/Footer/config.ts`.
- **Plugins**: redirects, nested-docs (categories + tour-categories), SEO, form-builder, search (posts only) — configured in `src/plugins/index.ts`.
- **Editor**: Lexical rich text (`src/fields/defaultLexical.ts`).
- **Types**: Auto-generated at `src/payload-types.ts` — run `pnpm generate:types` after changing collection/global schemas.

### Blocks
Content blocks in `src/blocks/` (ArchiveBlock, Banner, CallToAction, Code, Content, FeaturedTours, Form, MediaBlock, RelatedPosts, Testimonials, TourArchive, TourCategoriesShowcase). Rendered via `src/blocks/RenderBlocks.tsx`.

### Access Control
Reusable access functions in `src/access/`: `authenticated`, `authenticatedOrPublished`, `anyone`.

### Frontend Patterns
- **UI components**: shadcn/ui with Tailwind CSS v4. Config in `components.json`, utility at `src/utilities/ui.ts` (aliased as `@/utilities/ui`).
- **Fonts**: Geist Sans + Geist Mono.
- **Theme**: Dark/light via `src/providers/Theme/`, with `InitTheme` script to prevent FOUC.
- **Live Preview**: Supported via `@payloadcms/live-preview-react` — pages have `.client.tsx` counterparts for preview mode.
- **Heros**: Three tiers in `src/heros/` (HighImpact, MediumImpact, LowImpact) plus PostHero and TourHero.

### Path Aliases
- `@/*` → `src/*`
- `@payload-config` → `src/payload.config.ts`

### Database
SQLite via Turso (libSQL). Requires `DATABASE_URL` and `DATABASE_AUTH_TOKEN` env vars. The `sqliteAdapter` connects to the remote Turso database.
