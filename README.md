# WOOFY

WOOFY is a small pet-care PWA built with React and Vite. The current version is frontend-only and persists data on the device. The architecture is intentionally split so the local repository can later be replaced by an API-backed data source without rewriting the UI.

## Current behavior

- Installable PWA with offline assets
- Home, Planner, Health and Profile tabs
- Care completion, planner completion, selected planner date and Buddy's mood persist across reloads
- Existing pre-refactor localStorage keys are migrated into the new versioned state
- Onboarding is remembered after first completion
- No backend, login or database yet

## Routes

| Route | Screen |
| --- | --- |
| `/` | Onboarding |
| `/home` | Home |
| `/planner` | Planner |
| `/health` | Health |
| `/profile` | Profile |

## Architecture

The structure follows the same general principles used in larger React applications such as feature-based modules, centralized providers, reusable shared utilities, explicit routing boundaries and isolated data access.

```text
src/
  app/
    AppProviders.jsx

  components/
    AppLayout.jsx
    BottomNav.jsx
    InstallPrompt.jsx
    PageTransition.jsx

  config/
    assets.js
    routes.js

  data/
    index.js
    local-woofy-repository.js
    seed.js

  features/
    health/HealthPage.jsx
    home/HomePage.jsx
    onboarding/OnboardingPage.jsx
    planner/PlannerPage.jsx
    profile/ProfilePage.jsx

  lib/
    date.js
    storage.js

  state/
    WoofyProvider.jsx
    useWoofy.js

  App.jsx
  main.jsx
  index.css
```

### Data flow

```text
Feature UI
   ↓
WoofyProvider / actions
   ↓
Repository boundary (src/data/index.js)
   ↓
LocalWoofyRepository
   ↓
localStorage
```

Feature components do not read or write localStorage directly. This keeps persistence outside the UI.

When an API is introduced, the intended migration path is:

1. Add an API-backed repository or query layer under `src/data/`.
2. Keep server DTO mapping in the data layer.
3. Keep feature components consuming application/domain state rather than raw API responses.
4. Move server state to TanStack Query when remote fetching, caching and mutations are needed.
5. Keep device-only preferences (install prompt, onboarding/display preferences) local.

## Local persistence

The main application snapshot is stored under a versioned key:

```text
woofy.app-state.v1
```

The repository normalizes stored data and provides default values when old or malformed fields are missing. It also migrates these older keys:

```text
woofy-care-tasks
woofy-mood
woofy-planner
woofy-planner-date
```

This makes future storage migrations explicit instead of scattering localStorage calls throughout screens.

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
npm run check
npm run preview
```

Use `npm run check` before merging or deploying. Use `npm run preview` to test the production PWA locally.

## Deployment

The repository is configured for Vercel.

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- No environment variables are required for the local-data version

`vercel.json` rewrites application routes to `index.html` so direct navigation and refreshes work with React Router.

## Future API notes

Do not call the future API directly from page components.

Prefer:

```text
feature → application state/query hook → data client/repository → API
```

For a remote backend, good next additions are:

- TanStack Query for server state
- a small fetch/axios client with one base URL
- request/response schema validation
- domain-specific query keys
- centralized error handling
- environment-based API configuration
- optimistic mutations only where they improve UX

The current local repository boundary was added so that work can be introduced incrementally.
