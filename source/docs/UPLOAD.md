# Upload this project if the ChatGPT GitHub connection cannot write

The existing repository contained only a README when inspected. No files were
changed remotely because GitHub rejected the connected app's write request.

## Browser method

1. Download and extract `BoeteCheck.zip`. Open its `source` folder.
2. Sign in to https://github.com/Sarwen21/BoeteCheck.
3. Choose **Add file → Upload files**.
4. Drag the **contents of source**, not the outer ZIP or a containing folder,
   into the upload area. The root should contain `package.json`, `src/`,
   `public/`, `scripts/`, `docs/`, `tests/` and `.github/`.
5. Check that `.github/workflows/pages.yml` is included. If your file browser
   hides dot-prefixed files, enable “show hidden files” or use a code editor's
   Git upload instead.
6. Use a commit message such as “Add documented BoeteCheck frontend preview”.
7. Commit the files to `main` and follow the Pages setup in README.md.

The new README deliberately keeps the original project's one-line description
and adds setup instructions. There are no credentials or customer records.

## Easier alternative for continuing together

Allow the ChatGPT GitHub connection to write to this repository, or sign in to
GitHub in the shared browser. Then we can put the exact tested files on a branch
and review the changes without you manually uploading each file.

## The ready-site folder

The `ready-site` folder contains the generated website, including `index.html`.
It is suitable for a static host's direct-upload flow. It is not the editable
source. Keep the `source` folder too. No real submissions are enabled by uploading
either folder.
