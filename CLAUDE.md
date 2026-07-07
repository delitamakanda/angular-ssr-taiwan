# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                      # ng serve, dev server at http://localhost:4200
npm run build                  # ng build (production by default)
npm run watch                  # ng build --watch --configuration development
npm test                       # ng test (Vitest runner)
npm run serve:ssr:angular-ssr-taiwan   # run the built SSR server from dist/
npm run mock:api               # start the local mock WordPress API (see below)
```

Run a single test file/pattern with Vitest directly, e.g. `npx vitest run src/app/features/blog/state/article.store.spec.ts` or `npx vitest -t "test name"`.

There is no lint script configured; Prettier config lives in `.prettierrc` (100 print width, single quotes, Angular parser for `.html`).

### Mock WordPress API

The app is a headless-CMS frontend for a WordPress backend. `mock-wp-api/` is a standalone Node project (its own `package.json`) that serves fixture data (`mock-wp-api/db.json`) shaped like the real WP REST API so the app can be developed without a live WordPress instance. Run `npm run mock:api` from the repo root, or `cd mock-wp-api && npm run start:mock-api`. It listens on port 3000, matching `environment.development.ts`'s `wordpressApiUrl`.

## Architecture

Angular 21 app, standalone components, zoneless change detection, SSR via `@angular/ssr` (Express server in `src/server.ts`). Path alias `@app/*` maps to `src/app/*` (see `tsconfig.json`); some code also uses relative imports — prefer `@app/*` for new cross-feature imports.

### CMS integration layer (`src/app/cms/wordpress/`)

All WordPress REST API access is centralized here and must not be called directly from features:
- `wp-api.client.ts` — thin `HttpClient` wrapper (`WordpressApiClient`) with one method per WP endpoint/content type (posts, destinations, pages, media), returning raw `Wp*` interfaces that mirror the WP REST response shape.
- `wp-endpoints.ts` — endpoint path constants.
- `wp-*-mapper.ts` — pure functions that convert raw `Wp*` shapes into the app's domain models (e.g. `mapWpDestinationWithMedia` → `Destination`). Featured media is a separate WP entity keyed by ID, so mappers commonly take the raw item plus an already-fetched `Media` object.

Feature-level `*.api.ts` services (e.g. `features/destinations/services/destinations.api.ts`) call `WordpressApiClient`, resolve `featured_media` IDs via `getMediaById`, and apply the mappers to produce domain models. This is also where multi-request composition happens (`forkJoin`/`switchMap` to join a list with each item's media).

### State: signal stores

Each feature owns a `*.store.ts` (e.g. `DestinationStore`, `ArticleStore`) — an injectable, `providedIn: 'root'` class holding `signal()` state (`items`, `loading`, `error`, etc.) with `computed()` selectors and async methods that call the feature's `*.api.ts` via `firstValueFrom`. Components read/act on the store directly; there is no NgRx or similar library.

### Routing & data loading

- Top-level routes (`app.routes.ts`) are lazy-loaded per feature via `loadComponent`/`loadChildren`. Each feature has its own `*.routes.ts`.
- `app.routes.server.ts` declares SSR render modes per path (`RenderMode.Server` for all current routes) and is merged into the server config via `app.config.server.ts`.
- Route data that must be ready before navigation (e.g. Practical Info pages) uses a `ResolveFn` (`resolvers/*.resolver.ts`) that fetches via the feature API and redirects to `/not-found` on error, rather than loading state inside the component.

### HTTP interceptor chain

Registered in `app.config.ts` in this order: `apiBaseUrlInterceptor` → `errorInterceptor` → `loadingInterceptor`. `LoadingService` (signal-based) is toggled by the loading interceptor and read directly by `AppShellComponent` to show a global `app-loader` overlay during in-flight requests.

### SEO

`SeoService` (`core/seo/seo.service.ts`) centralizes `Title`/`Meta` updates plus canonical link tag management; feature pages call `.update()` with a `SeoData` object rather than touching `Meta`/`Title` directly.

### Layout

`AppShellComponent` (`core/layout/shell/`) is the single layout wrapper (header, router-outlet, footer, loading overlay) rendered from the root `App` component.

## Angular/TypeScript conventions (from `.junie/guidelines.md` / Copilot instructions)

These are enforced conventions for this codebase, not generic advice — follow them for any new or edited code:

- Standalone components only; do **not** set `standalone: true` (implicit default).
- Signals for state; `computed()` for derived state; never `.mutate()` — use `update()`/`set()`.
- `input()`/`output()` functions, not `@Input()`/`@Output()` decorators.
- `inject()` function, not constructor injection.
- `ChangeDetectionStrategy.OnPush` on every component.
- No `@HostBinding`/`@HostListener` — use the `host` object in the decorator.
- Native control flow (`@if`/`@for`/`@switch`), not `*ngIf`/`*ngFor`/`*ngSwitch`.
- `class`/`style` bindings, not `ngClass`/`ngStyle`.
- Reactive forms, not template-driven.
- `NgOptimizedImage` for static images (not inline base64).
- External template/style files are referenced relative to the component's `.ts` file.
- Must pass AXE checks and WCAG AA (focus management, contrast, ARIA).