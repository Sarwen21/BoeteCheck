# Free hosting: a simple route forward

Checked against official documentation on 23 November 2026. Free plans have
limits; review them again when choosing production hosting.

| Option | Good for | What it does not supply on its own |
| --- | --- | --- |
| GitHub Pages | A project showcase/preview from a public repository | Private uploads, accounts, database, mail; business-hosting use is restricted |
| Cloudflare Workers Static Assets | The frontend and a path to server functions later | A complete case-management backend |
| Cloudflare Pages | The frontend, GitHub-connected deploys and previews | A complete case-management backend |
| Supabase Free plus either frontend host | Trying sign-in, private storage and database | Unlimited storage/usage or guaranteed always-on operation |

For the current frontend preview, the included GitHub Pages setup is technically
sufficient. GitHub restricts Pages use for online businesses and commercial SaaS.
For the actual BoeteCheck service, I recommend **Cloudflare** as the frontend host.
Cloudflare now recommends Workers for new projects, while Pages remains supported.
First inspect/export the existing Lovable backend; don't create another database
until we know what is already there.

## GitHub Pages

Follow the numbered steps in the root README. The build command is
`npm run build`; the published folder is `dist`. No install step is needed.

## Cloudflare Pages, if you prefer it

1. Create or sign in to your Cloudflare account yourself.
2. Open **Workers & Pages** and choose **Create application**.
3. Choose **Pages**, then **Import an existing Git repository**.
4. Connect GitHub yourself and select `Sarwen21/BoeteCheck`.
5. Use production branch `main`, build command `npm run build`, output directory
   `dist`, and environment variables `SITE_BASE` set to `/` and `NODE_VERSION`
   set to `24`.
6. Deploy. Cloudflare provides a `pages.dev` address and can build preview branches.
7. Check the homepage, a deep article URL, refresh, form validation and mobile menu.

The same files work on either host. Changing hosts does not enable submissions.

## Cloudflare Workers, recommended for a new service

The included `wrangler.jsonc` tells Cloudflare to serve `dist/` as static files.

1. Sign in to Cloudflare and open **Workers & Pages**.
2. Create a Worker connected to GitHub and select `Sarwen21/BoeteCheck`.
3. Set the build command to `npm run build` and deployment command to
   `npx wrangler deploy`. Set `SITE_BASE=/` and `NODE_VERSION=24`.
4. Deploy using the free plan. Confirm the result at the returned `workers.dev`
   address. If a step asks you to select a paid plan, stop before accepting it.

Alternatively, from a local copy run `npm run build`, `npx wrangler login` and
`npx wrangler deploy`. Set `SITE_BASE=/` when building for the domain root.
You complete sign-in/permissions yourself. Static asset requests are currently
free; server functions and other services have separate free-tier limits.

## Supabase, only if a new backend is needed

1. Sign up yourself and create a project in the chosen region.
2. Keep its database password private.
3. Share the project URL and public/publishable key only when implementation needs
   them; never share a secret/service-role key in public code.
4. We then add the schema, user access policies, private storage and real sign-in.
5. Test with synthetic documents and at least two separate accounts to verify
   that one customer cannot see another customer's case.

The Free plan currently includes 500 MB database storage and 1 GB file storage,
and free projects may pause after one week of inactivity. It suits development;
review operational requirements before relying on it for customers.

## Official references

- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://developers.cloudflare.com/workers/static-assets/get-started/
- https://developers.cloudflare.com/workers/platform/pricing/
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- https://developers.cloudflare.com/pages/platform/limits/
- https://supabase.com/pricing
