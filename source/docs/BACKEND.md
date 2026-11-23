# Connecting real applications and private cases

GitHub Pages serves files. It cannot privately receive documents, send mail,
store dossiers or authenticate customers by itself. This version deliberately
does not collect real applications until those services are connected.

## First choice: export the original project

This avoids rebuilding working features and losing the original data design.

1. Log in to Lovable and open the original project.
2. Open **Project settings → Git → GitHub** and connect the project.
3. Authorise the connection yourself and follow Lovable's repository setup.
   Lovable may create its own repository; keep that separate from this rebuild
   until the code can be compared.
4. Share that repository URL here, or download and attach a ZIP of the source.
5. We can then inspect its database tables, file storage rules, login flow and
   server functions, and migrate them deliberately.

Official guide: https://docs.lovable.dev/integrations/github. A direct ZIP
download is also documented under **Project settings → Git → Download codebase**
or the Code editor sidebar (paid plans). The github.com sync connection is
available on all plans; the code export does not by itself move hosted data.

Do not paste passwords, private service-role keys or customer files into chat
or a GitHub issue. Source code and public configuration are sufficient to start.

## If building a new backend

Supabase is one possible service for sign-in, database records and private file
storage. Before implementation, decide the data region, operator contact,
retention period and which staff may access each case.

The first implementation should provide:

- Verified customer sign-in, with each customer restricted to their own cases.
- Private file storage; never a public uploads bucket or files in this repository.
- Server-side file size/type checks, safe filenames and limits on repeated requests.
- A submission process that records a case only after all required files succeed,
  or cleans up partial uploads on failure. Retry must not create duplicate cases.
- A server-generated case number after confirmed submission, not before.
- A case timeline and clear distinction between an application and formal appeal.
- Staff access granted by a server-controlled role, not a browser-editable flag.
- Transactional email, delivery/error handling and a genuine account recovery path.
- A written privacy notice matching the actual configured services.

Keep the new service integration in its own module, for example `submission.js`.
`wizard.js` should call that module only after final validation. Show success only
after the backend confirms receipt. Keep service credentials on the server.

No unimplemented API URL has been added to the public settings: changing a
single “production” switch must not make the preview pretend to be a live service.
