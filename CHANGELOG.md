# Changelog

All notable changes to Lango are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.2.0]

### Added

- npm installation support/documentation (`npm install lango-i18n`)
- pnpm installation support/documentation (`pnpm add lango-i18n`)
- Yarn installation support/documentation (`yarn add lango-i18n`)
- Bun installation support/documentation (`bun add lango-i18n`)
- Package-manager selector in documentation (npm / pnpm / yarn / bun tabs)
- Copy-to-clipboard installation commands with Copied/Failed confirmation
- Improved package exports (ESM + CJS + types + `./styles.css` + `./package.json`)
- Improved published package configuration (`files`, `publishConfig`, `sideEffects`)
- Package-manager compatibility testing (CI matrix: npm, pnpm, Yarn, Bun)
- Consumer verification: packed tarball installs and renders in an isolated app
- Dedicated docs page (`#/docs`) with 15 sections, deep-linkable per section
- LanguageSwitcher reliability: waits for lazily-loaded Google options, verifies
  the switch, surfaces clear errors, stays retryable after failure

### Changed

- Version bumped to 1.2.0 across `lango`, `lango-website`, and the monorepo root
- `LanguageSwitcher` accepts Tailwind overrides (`triggerClassName`,
  `menuClassName`, `optionClassName`); no stylesheet import required
- Build script no longer shells out to `npm` (works identically under
  pnpm/Yarn/Bun)
- Internal modules split by responsibility; every source file ≤ 150 lines
  (no public API changes)

### Compatibility

- Existing v0.1 API fully preserved: `<Lango>`, `<LanguageSwitcher>`,
  `useLango()` - no renames, no removals, no migration needed.
