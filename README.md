# Tech Inventory Tracker

A personal hardware build and shopping tracker. Built with React + Vite.

**Live app:** https://haxxsimd.github.io/tech-inventory-tracker/

## Features

- Project-based organization (builds, repairs, office setup, etc.)
- Track parts you need vs parts you already have
- Status tracking: Needed → Ordered → Waiting → Complete
- Target price and actual price (SEK)
- Source notes (Tradera, Aliexpress, Webhallen, etc.)
- Notes/links field for specs and URLs
- Bilingual: English / Swedish
- Persists data in localStorage
- Mobile-friendly dark UI

## Project structure

```
src/
  main.jsx               # Entry point
  App.jsx                # Root component
  TechInventoryTracker.jsx  # Main app
index.html
vite.config.js
package.json
.github/workflows/deploy.yml  # Auto-deploy to GitHub Pages
```

## Local development

```bash
npm install
npm run dev
```

## Deploy

Push to `main` and GitHub Actions will build and deploy automatically to GitHub Pages.

Make sure GitHub Pages is set to use the `gh-pages` branch in your repo settings:
**Settings → Pages → Source → Deploy from branch → gh-pages**
