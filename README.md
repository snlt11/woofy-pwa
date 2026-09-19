# WOOFY

A cute pet-care companion PWA for Buddy, built with React, Vite and `vite-plugin-pwa`.

Frontend only: no API, database or login. Task completion, Buddy's mood and the selected Planner date are saved in the browser's `localStorage`.

## Screens

| Route      | Screen     |
| ---------- | ---------- |
| `/`        | Onboarding |
| `/home`    | Home       |
| `/planner` | Planner    |
| `/health`  | Health     |
| `/profile` | Profile    |

## Development

```bash
npm install
npm run dev       # dev server with hot reload
npm run build     # production build into dist/
npm run preview   # serve dist/ (use this to test the PWA and offline mode)
npm run lint      # oxlint
```

## Deployment (Vercel)

Import the repo into Vercel with the **Vite** preset (build `npm run build`, output `dist`). No environment variables are needed.

`vercel.json` rewrites unknown paths to `index.html`, so opening or refreshing `/home`, `/planner`, `/health` or `/profile` directly works instead of returning 404.

## Project structure

```text
public/
  assets/   buddy-master.png, woofy-logo.png, paw.png
  pwa/      app icons (192, 512, maskable 512, apple-touch)
src/
  components/  AppLayout (persistent BottomNav + page transition), BottomNav, PageTransition
  hooks/       useLocalStorage
  pages/       Onboarding, Home, Planner, Health, Profile
  index.css    design tokens and all styles
```
