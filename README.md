# OnlyDevOps Modern Learning Platform

React, Vite, and Tailwind CSS implementation of the OnlyDevOps landing page and the Stitch-inspired architecture designer.

## Requirements

- Node.js 20 or newer
- npm

## Local Development

```bash
npm install
npm run dev
```

Open:
- `http://127.0.0.1:5173/` for the landing page
- `http://127.0.0.1:5173/designArchitecture` for the architecture designer

## Tests

```bash
npm test
```

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Deployment

This project is configured for Vercel.

- Framework preset: Vite
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrites enabled for direct route loads such as `/designArchitecture`

## Project Structure

- `src/App.jsx` - lightweight route switcher and document title handling
- `src/HomePage.jsx` - OnlyDevOps landing page sections and UI
- `src/pages/DesignArchitecturePage.jsx` - Stitch-inspired architecture canvas built with React Flow
- `src/index.css` - Tailwind layers and shared component styling
- `tailwind.config.js` - design tokens and theme extensions
- `stitch-exports/` - original Stitch screen export for reference
