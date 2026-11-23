# How to understand and change the code

Think of this project as three parts:

1. **Content**: the words and sections visitors see.
2. **Appearance**: colours, spacing, type sizes and mobile layout.
3. **Behaviour**: what happens when someone opens a menu or clicks Next.

## Content

`src/content.mjs` contains lists of FAQ answers, fine categories and article
introductions. Changing an answer there changes the FAQ page after the next build.

`src/pages.mjs` describes each page. Each entry has a route (its address), a title,
a description for search engines, and the page content. To change the homepage,
find the first entry with `route: ''`. To change the form, find `route:'boetecheck'`.

`src/templates.mjs` holds reusable pieces: the header, footer, logo, three steps
and bottom call to action. Change these once and every page receives the change.

## Appearance

`public/assets/styles.css` is divided with comments. The colours at the top are
shared settings. For example, `--teal` is the main accent. The mobile rules are at
the bottom. Change one thing at a time and check both a phone-sized window and a
desktop-sized window.

The hero illustration is `public/assets/hero-boetecheck.jpg`. Replace it using
the same name, or update its filename and alternative text in `src/pages.mjs`.

## Behaviour

`public/assets/app.js` opens the mobile menu and remembers cookie choices.
It starts `wizard.js` only if a form exists on the current page.

`wizard.js` stores the current step and selected files in memory. It validates
before moving forward. It uses `textContent` when displaying visitors' input,
so typed text cannot become executable HTML. It never sends a network request.

`validation.js` contains small independent rules, making them easy to test.
Its file checks are for user feedback; a real server must verify files again.

## Building and links

`scripts/build.mjs` creates a separate `index.html` for every route. It copies
`public/` into `dist/`. A page at `aanvechten/snelheidsboete-aanvechten/` uses
`../../assets/styles.css`, so it works even if the whole site is under a GitHub
repository subfolder. No client router or special 404 redirect is needed.

`scripts/serve.mjs` previews the generated files. It also accepts `/BoeteCheck/`
so local checks can mimic the final GitHub URL.

## Backtracking a change

Make one focused change per commit. Use a message such as “Make homepage title
smaller on phones”. GitHub's **History** and **Files changed** then show exactly
what changed. If a change causes a problem, revert that commit instead of
guessing which lines to undo. Do not rewrite shared history with a force push.
