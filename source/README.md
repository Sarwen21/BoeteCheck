# BoeteCheck

Webpage voor mensen om hun boetes te kunnen oplossen.

A documented recreation of the public website at https://boetecheck.lovable.app.
It preserves the navy/teal design, original hero image, Dutch content, public
pages, FAQ and a five-step form. This is a **frontend preview**, not a complete
transfer of the original service. No real applications are sent.

## Start on your computer

1. Install Node.js 24 LTS from https://nodejs.org if it is not installed.
2. Open this folder in your code editor.
3. In its terminal, type `npm run dev`.
4. Open http://127.0.0.1:4173/BoeteCheck/ in your browser.

There are no third-party packages to install. After editing, stop the preview
with Ctrl+C and run `npm run dev` again to rebuild the pages.

## Publish on GitHub Pages

1. Open https://github.com/Sarwen21/BoeteCheck/settings/pages.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Open the repository's **Actions** tab.
4. Choose **Check and publish BoeteCheck**, then **Run workflow** on `main`.
5. Wait for both `build` and `deploy` to turn green.
6. GitHub will show the published URL, expected to be
   https://sarwen21.github.io/BoeteCheck/.

After this setup, each change pushed to `main` rebuilds and republishes the site.
Pull requests run the checks without publishing. `npm test` checks relative links
under both `/` and `/BoeteCheck/` and tests important validation rules.

## Find the part you want to change

| What you want to change | File |
| --- | --- |
| Repeated text, FAQs, categories, article introductions | `src/content.mjs` |
| Homepage sections and individual pages | `src/pages.mjs` |
| Header, footer, shared layout, relative links | `src/templates.mjs` |
| Colours, sizes, mobile layout | `public/assets/styles.css` |
| Form steps and file selection | `public/assets/wizard.js` |
| Form/file validation rules | `public/assets/validation.js` |
| Mobile menu and cookie preferences | `public/assets/app.js` |
| Public settings | `public/config.js` |
| How pages are generated | `scripts/build.mjs` |
| Automatic GitHub deployment | `.github/workflows/pages.yml` |

Edit these source files, not `dist/`. The build recreates `dist/`.
See [the code guide](docs/CODE-GUIDE.md) for a plain-language explanation.

For the eventual business service, use Cloudflare rather than assuming GitHub
Pages is suitable: GitHub restricts Pages use for online businesses/commercial
SaaS. This repository includes optional `wrangler.jsonc` configuration and
step-by-step alternatives in the hosting guide.

## What works and what remains

- All 15 public pages have real HTML files. Direct links and refreshes work.
- The original hero image is stored locally. No asset depends on Lovable.
- The form supports category preselection, validation, back/next, file selection,
  removal, drag/drop, review and a downloadable text overview.
- No document is uploaded. No email is sent. No dossier number is invented.
- Sign-in, private cases, real submission, authorisation and staff tools still
  require the original source/backend or a new backend implementation.
- The original site's fonts were identified but not recovered as licensed local
  font files. This version uses system fonts and makes no Google Fonts requests.
- Steps 4–5 are a new implementation based on their visible step labels; they
  were not copied from inaccessible original screens.

Read [the inspection notes](docs/AUDIT.md), [backend plan](docs/BACKEND.md), and
[free hosting guide](docs/HOSTING.md). Never commit fine documents, customer
information, passwords or private server keys to this public repository.
