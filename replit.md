# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── portfolio/          # Manav Nanda portfolio (Angular 19)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Portfolio Artifact (`artifacts/portfolio`)

An Angular 19 personal portfolio website for Manav Nanda (Full-Stack Developer).

- **Preview path**: `/` (root)
- **Stack**: Angular 19 (standalone components), TypeScript 5.6, `@angular-devkit/build-angular` (esbuild builder)
- **Dev server**: `ng serve --host 0.0.0.0 --port 21113`
- **Fonts**: Syne 800 (headings) + Space Mono (mono/body) via Google Fonts
- **Design**: Dark theme — bg `#080812`, accents purple `#7c3aed` / cyan `#06b6d4` / pink `#f472b6`
- **Components** (all standalone in `src/app/components/`):
  - `nav` — fixed navbar with active section highlighting (IntersectionObserver)
  - `hero` — typing animation, CTA buttons, floating stat badges
  - `marquee` — auto-scrolling tech stack strip
  - `about` — bio + skill cards grid (Frontend / Backend / Data & Cloud / Integrations)
  - `experience` — timeline of work history
  - `projects` — filterable project cards (All / Angular / .NET / Full-Stack / Cloud)
  - `certifications` — cert cards + education
  - `services` — service offering cards
  - `contact` — contact info + NgModel form with toast feedback
  - `footer` — links, socials, copyright
- **Features**:
  - Custom animated cursor (dot + ring with RAF interpolation)
  - Scroll progress bar
  - Typing animation cycling through developer roles
  - IntersectionObserver scroll-reveal (`.reveal` class)
  - Active nav highlighting
  - Project filter buttons
  - Contact form with toast
  - Back-to-top button
  - Responsive layout
- **Sections**: Hero → Marquee → About → Experience → Projects → Certifications → Services → Contact → Footer

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec and Orval config.

Run codegen: `pnpm --filter @workspace/api-spec run codegen`
