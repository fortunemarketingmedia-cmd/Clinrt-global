# Static Data Store

This project centralizes all static strings, constants, and configuration under `data/` and `config/`. The goal is a single source of truth with type safety, validation, and tree-shakeable exports.

## Structure
- `config/app-config.ts`: Environment-aware configuration (singleton).
- `data/`
  - `types.ts`: Shared TypeScript types.
  - `utils.ts`: Deep-freeze + lazy loader helpers.
  - `validators.ts`: Runtime validation at load time.
  - `site.ts`: Site metadata.
  - `navigation.ts`: Global navigation items.
  - `footer.ts`: Footer copy and links.
  - `ui.ts`: Shared UI labels.
  - `i18n.ts`: Localization scaffolding.
  - `pages/*.ts`: Page-specific data.
  - `registry.ts`: Lazy-loaded accessors (cached).
  - `getters.ts`: Convenience accessors.

## Usage
```ts
import { navigation, footerData, blogHero } from "@/data";
import { getBlogPosts } from "@/data";

const posts = await getBlogPosts();
```

## Validation
All exported data is validated at module load via `data/validators.ts`. Tests can import these modules to guarantee integrity.

## Environments
`config/app-config.ts` reads:
- `NEXT_PUBLIC_APP_ENV` (`development` | `staging` | `production`)
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ENABLE_CURSOR`
- `NEXT_PUBLIC_ENABLE_ANIMATIONS`

## Extending
Add new feature data under `data/pages/` or create a new domain folder. Always:
1. Define types in `data/types.ts`.
2. Validate in `data/validators.ts`.
3. Export via `data/index.ts`.

## Tests
`tests/static-data.test.ts` validates that core datasets are populated and config is valid.
Run with `npx tsx --test tests/static-data.test.ts`.

## Migration
Use `scripts/migrate-static-data.mjs` to automate replacing inline constants with data imports.
