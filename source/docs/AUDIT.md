# Inspection and migration record

Reference: https://boetecheck.lovable.app, inspected 23 November 2026.

## Observed

- White sticky navigation; deep navy hero with teal accents; large heavy heading.
- Original image of phone, fine, car and traffic camera; floating status card.
- Three process cards, five fine categories, six benefits, funding section and CTA.
- Original type families: Bricolage Grotesque (headings), Manrope (body).
- How-it-works, funding, ten expandable FAQs, terms, privacy, cookie settings and
  six fine information pages were read.
- Form labels: Soort boete, Gegevens, Upload, Toelichting, Contact.
- First step validates missing choices. Fine details may be left empty.
- Original upload step requires a file, advertises 3 files, 10 MB, JPG/PNG/PDF.
- The case page returned no readable content in this browser session. Some
  navigations timed out. This does not prove the original site is broken.
- The Lovable connection required reauthentication. The editor invitation had
  previously reached a login screen. Original source and backend were unavailable.

## Intentional differences

- Rebuilt from visible behaviour and content, not a source-code export.
- Self-contained static HTML instead of the original bundled application.
- System fonts instead of remotely hosted Google Fonts; visual spacing may differ.
- No Lovable edit badge or original tracking code.
- Native FAQ disclosures, keyboard focus, skip link, reduced-motion support.
- Single-choice radio buttons for category/letter rather than checkbox semantics.
- Honest preview notice, final review and downloadable overview. No fake success
  message or made-up case number. Later form fields are newly implemented.
- Privacy and cookies describe what this build actually does. Original claims
  about private server storage were not copied as if implemented here.

## Unfinished original content

The funding, terms and privacy pages contained “Ter goedkeuring” notes. The
business model, company information, authority to act and handling of cost
awards are not settled by this migration. Review these before real operation.

## Not migrated

Authentication, private files, database records, case status, notifications,
staff/admin tools and signatures/authorisations were not accessible. No old
customer data, keys or permissions have been copied. See BACKEND.md.

## Asset origin

`public/assets/hero-boetecheck.jpg` was exported from the user-owned live site:
`/assets/hero-boetecheck-DxkTS3bZ.jpg`.
The favicon shield was exported from its rendered SVG. Other small line icons
were redrawn inline. These assets are included, not hotlinked. Ownership and
any third-party asset licences should remain with the original project records.

## Verification

The build and Node tests passed locally. Tests resolve every generated internal
link and asset under both a domain root and `/BoeteCheck/`, and exercise required
fields and upload boundaries. Browser QA of the new site was blocked because the
inspection browser could not connect to the local preview server; desktop and
mobile appearance, real clicks and downloads still need browser verification.
No claim of a successful GitHub Pages deployment follows from a local build.
