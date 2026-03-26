# AGENTS.md

## Build / Lint / Test Commands

| Command | Description |
|---------|-------------|
| `npm start` | Run dev server (HTTPS, webpack-dev-server) |
| `npm run build` | Production build to `build/` |

No test framework is configured — there are no test files or test scripts in `package.json`.
No linter/formatter is configured — there are no ESLint, Prettier, or similar configs.

If tests or linting are added later, update this file.

## Project Structure

```
src/
  components/   # Reusable UI components (slide-show, vertical-timeline, button-group, google-photo-slide-show)
  hooks/        # Custom React hooks (useStrings)
  locales/      # i18n JSON files (en-US.json) and locale utilities
  pages/        # Route-level page components (Home, Resume, Music, Reels, Events, Contact)
  three-dee/    # Three.js scene classes
  utils/        # Utility functions (env-utils, sheets-utils, google-drive-utils)
  index.tsx     # App entry point
  App.tsx       # Root component with HashRouter
  NavBar.tsx    # Navigation bar component
public/         # Static assets (images, models, data, favicon)
server/         # Server-related code (dist, node_modules)
```

## Path Aliases

Webpack and TypeScript are configured with `@adee` → `src/`:
```ts
import Home from '@adee/pages/Home';
import {getEnvVar} from '@adee/utils/env-utils';
```

Use `@adee/` for cross-directory imports within `src/`. Use relative imports (`../`, `./`) only for sibling/parent files within the same directory.

## Tech Stack

- **React 19** with `react-router-dom` v7 (HashRouter)
- **TypeScript** 4.9 (strict mode enabled)
- **Webpack** 5 with `ts-loader`, `css-loader`, `style-loader`
- **Three.js** for 3D scenes
- **Node 23** (per `.nvmrc`)

## Code Style

### General
- TypeScript strict mode is on — always provide explicit types for function parameters, return values, and exported members.
- Use `interface` for object shapes and component props. Use `type` for unions, intersections, and aliases.
- Prefer `const` over `let`. Avoid `var`.

### Imports
- React: `import React from 'react'` (explicit default import, even with `jsx: react-jsx`)
- Named imports from libraries: `import {useState, useEffect} from 'react'`
- CSS: `import './ComponentName.css'` (co-located, imported after other imports)
- Path alias for cross-module: `import X from '@adee/path'`
- Relative for siblings: `import {getStrings} from '../locales'`

### Naming Conventions
- **Files**: `PascalCase.tsx` for components, `kebab-case.ts` for utilities/hooks/three-dee modules
- **Components**: PascalCase (`NavBar`, `VerticalTimeline`, `SlideShow`)
- **Hooks**: camelCase with `use` prefix (`useStrings`)
- **Interfaces/Types**: PascalCase (`TimelineNode`, `SlideShowProps`, `ThreeJSOptions`)
- **Constants**: UPPER_SNAKE_CASE (`MOBILE_WIDTH_THRESHOLD`, `HEADSHOT_IMG_PATH`)
- **Functions**: camelCase (`getEnvVar`, `fetchSheet`, `getGoogleDriveStreamUrl`)

### Components
- Functional components typed as `React.FC` or `React.FC<Props>`
- Default exports for page components: `export default Home`
- Named exports for reusable components/utilities: `export { SlideShow, type SlideEntry }`
- Co-locate CSS with component: `ComponentName.css` in the same directory

### Error Handling
- Throw errors for missing required env vars: `throw new Error('Missing environment variable: ${key}')`
- No global error boundary currently exists — handle errors at the call site

### Styling
- Plain CSS files (no CSS modules, no CSS-in-JS)
- CSS class names use kebab-case (`navbar-links`, `slide-image`, `timeline-container`)
- CSS custom properties for theming (`var(--green-dot)`, `var(--yellow-dot)`, `var(--blue-dot)`)

### Environment Variables
- Access via `process.env[key]` with `getEnvVar()` from `@adee/utils/env-utils`
- Variables are injected via `webpack.DefinePlugin`
- Required env vars: `REACT_APP_GOOGLE_DRIVE_FOLDER_ID`, `REACT_APP_GOOGLE_DRIVE_API_KEY`
- `.env` is gitignored — never commit secrets

## Deployment

GitHub Actions deploys to GitHub Pages on push to `main`. The build output in `build/` is published via `peaceiris/actions-gh-pages` with CNAME `www.amanda-dee.com`.

```yaml
# Key deploy steps:
npm install --force
npm run build
# Deploy build/ to gh-pages
```
