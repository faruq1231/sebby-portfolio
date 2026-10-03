# Faruq portfolio

Source for the portfolio at [faruq.tech](https://faruq.tech), built with React, TypeScript, and Vinext. The design uses the supplied Faruq logo with a black, ivory, and warm grey palette, responsive layouts, accessible controls, and reduced-motion support.

## Local development

Use Node.js 22.13 or newer and npm. From this folder:

```sh
npm ci
npm run dev
```

Open the local URL printed by the development server. To create the static site:

```sh
npm run build
```

The deployable output is `dist/client`. `scripts/build.mjs` checks for a completed static export before ignoring Vinext's known Windows `UV_HANDLE_CLOSING` shutdown assertion; other build failures still fail the command.

## Editing the portfolio

| File | What to change |
| --- | --- |
| `app/page.tsx` | Main copy, projects, skills, and links |
| `app/globals.css` | Palette, spacing, responsive layouts, and visual styles |
| `app/layout.tsx` | Page title, description, metadata, and fonts |
| `components/PortfolioOutro.tsx` | Closing section and contact links |
| `public/faruq-logo.png` | Transparent logo used by the site and favicon |
| `public/faruq-portrait.jpeg` | Portrait |
| `public/masterspred-showcase.webp` | Project showcase image |

Files in `public` are served from the site root. Rebuild after changing source files or assets.

## Netlify deployment

The [faruq1231/sebby-portfolio](https://github.com/faruq1231/sebby-portfolio) repository deploys to the `sebby-portfolio` Netlify site with:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Base directory | Repository root |
| Build command | `npm run build` |
| Publish directory | `dist/client` |
| Node.js | `22` |

`netlify.toml` contains the build and publish settings. Netlify automatically deploys changes pushed to `main`. The production domain is `faruq.tech`.

For a manual deploy, upload the generated `dist/client` folder. The `dist` folder beside this `source` folder is a manual deployment archive; refresh it from a successful build before uploading it. Edit the source files above rather than generated files in either output folder.

## Checks

```sh
npm run lint
npm run build
```

Before publishing, preview at phone and desktop widths, check for horizontal scrolling, and test navigation, contact links, the light switch, and reduced-motion preferences.
