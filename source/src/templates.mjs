/** PAGE LAYOUT: reusable HTML pieces. Build-time rendering means each URL has a
 * real index.html; refreshes work on GitHub Pages without a router workaround.
 */
import { steps, articles, disclaimer } from './content.mjs';

export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));

const paths = {
  shield: '<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z"/><path d="m8 12 3 3 5-6"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  upload: '<path d="M6 21H4V3h10l6 6v12H6M14 3v6h6M12 18v-7m-3 3 3-3 3 3"/>',
  search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6m-14-11 2 2 4-4"/>',
  heart: '<path d="M20 12c6-7-3-12-8-6C7 0-2 5 4 12l8 8z"/>',
  car: '<path d="m4 10 2-6h12l2 6M3 10h18v9H3zM6 19v2m12-2v2M6 14h2m8 0h2"/>',
  traffic: '<rect x="7" y="2" width="10" height="17" rx="3"/><path d="M12 19v3"/><circle cx="12" cy="6" r="1"/><circle cx="12" cy="10" r="1"/><circle cx="12" cy="14" r="1"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
  parking: '<circle cx="12" cy="12" r="10"/><path d="M9 18V6h4a4 4 0 0 1 0 8H9"/>',
  file: '<path d="M5 2h9l5 5v15H5zM14 2v6h5M8 12h8M8 16h6"/>',
  chat: '<path d="M3 3h18v14H8l-5 4zM7 7h10M7 11h7"/>',
  route: '<circle cx="5" cy="18" r="3"/><circle cx="19" cy="6" r="3"/><path d="M8 18h9a4 4 0 0 0 0-8H7a4 4 0 0 1 0-8h7"/>',
  eye: '<path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'
};
export const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.file}</svg>`;
export const brand = root => `<a class="brand" href="${root}" aria-label="BoeteCheck, naar de homepage"><span class="brand-icon">${icon('shield')}</span><span>Boete<span class="teal">Check</span></span></a>`;
export const button = (href, text, secondary = false) => `<a class="button${secondary ? ' button-secondary' : ''}" href="${href}">${text}</a>`;
export function processSection() {
  return `<section class="section" id="hoe-werkt-het"><div class="wrap"><div class="section-heading"><p class="eyebrow">IN 3 STAPPEN</p><h2>Zo eenvoudig werkt het</h2></div><div class="grid three">${steps.map(([ic,title,text],i)=>`<article class="card step-card"><span class="icon-tile">${icon(ic)}</span><span class="step-number">${i+1}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></div></section>`;
}
export const cta = root => `<section class="section"><div class="wrap"><div class="cta"><h2>Twijfel je of je verkeersboete terecht is?</h2><p>Controleer je mogelijkheden en vraag gratis ondersteuning aan.</p>${button(root+'boetecheck/','Start mijn gratis boetecheck')}</div><p class="disclaimer">${disclaimer}</p></div></section>`;
export const pageIntro = (label, title, text='') => `<div class="page-intro"><p class="eyebrow">${label}</p><h1>${title}</h1>${text?`<p class="lead">${text}</p>`:''}</div>`;

export function layout({ route, title, description, content, noindex = false }) {
  // ../../ from a nested article, ../ from a normal page, ./ from home.
  const depth = route.split('/').filter(Boolean).length;
  const root = depth ? '../'.repeat(depth) : './';
  const nav = [['hoe-het-werkt','Hoe werkt het?'],['is-het-gratis','Is het gratis?'],['veelgestelde-vragen','Veelgestelde vragen'],['mijn-zaken','Mijn zaken']];
  const link = ([slug,label]) => `<a href="${root}${slug}/"${route===slug?' aria-current="page"':''}>${label}</a>`;
  return `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escapeHtml(description)}"><meta name="theme-color" content="#071936"><title>${escapeHtml(title)} | BoeteCheck</title>${noindex?'<meta name="robots" content="noindex, nofollow">':''}<link rel="icon" href="${root}assets/shield.svg" type="image/svg+xml"><link rel="stylesheet" href="${root}assets/styles.css"><script src="${root}config.js" defer></script><script type="module" src="${root}assets/app.js"></script></head>
<body data-root="${root}" data-page="${route}"><a class="skip-link" href="#main">Ga naar inhoud</a>
<header class="header"><div class="wrap nav-wrap">${brand(root)}<button class="menu-toggle" aria-label="Menu openen" aria-controls="navigation" aria-expanded="false"><span></span><span></span><span></span></button><nav id="navigation" aria-label="Hoofdnavigatie">${nav.map(link).join('')}${button(root+'boetecheck/','Gratis boetecheck')}</nav></div></header>
<main id="main">${content(root)}</main>
<footer class="footer"><div class="wrap footer-grid"><div>${brand(root)}<p>BoeteCheck is een onafhankelijke dienst. Wij zijn geen onderdeel van het CJIB, het Openbaar Ministerie, een gemeente of de Nederlandse overheid.</p></div><div><h2>Boetes</h2><ul>${articles.map(a=>`<li><a href="${root}aanvechten/${a.slug}/">${a.label}</a></li>`).join('')}</ul></div><div><h2>BoeteCheck</h2><ul>${[...nav.slice(0,3),['voorwaarden','Voorwaarden'],['privacy','Privacyverklaring'],['cookies','Cookie-instellingen']].map(l=>`<li>${link(l)}</li>`).join('')}</ul></div></div><div class="wrap copyright">© ${new Date().getFullYear()} BoeteCheck · Geen garantie op het vernietigen van een boete.</div></footer>
<aside id="cookie-banner" class="cookie-banner" aria-label="Cookiekeuze" hidden><p>Deze versie gebruikt alleen noodzakelijke opslag voor je cookiekeuze. Er worden geen meetcookies geladen. <a href="${root}cookies/">Meer info</a></p><div class="button-row"><button class="button" data-cookie="all">Accepteren</button><button class="button button-outline" data-cookie="necessary">Alleen noodzakelijk</button></div></aside>
</body></html>`;
}
