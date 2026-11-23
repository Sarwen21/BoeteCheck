/** Builds real HTML pages with relative asset/navigation paths.
 * No package installation or framework is needed: just Node.js.
 * dist/ is generated; edit src/ or public/ instead.
 */
import { mkdir, cp, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pages } from '../src/pages.mjs';
import { layout } from '../src/templates.mjs';

export async function build(output = fileURLToPath(new URL('../dist/', import.meta.url))) {
  await mkdir(output, {recursive:true});
  await cp(new URL('../public/', import.meta.url), output, {recursive:true});
  for(const page of pages){
    const directory=path.join(output,page.route);
    await mkdir(directory,{recursive:true});
    await writeFile(path.join(directory,'index.html'), layout(page));
  }
  await writeFile(path.join(output,'.nojekyll'),'');
  // A real 404 rather than silently showing the wrong page. GitHub Pages serves
  // this at unknown paths. The absolute homepage is supplied by the deployment.
  const home=process.env.SITE_BASE || '/BoeteCheck/';
  if(!/^\/[a-zA-Z0-9/_-]*\/$/.test(home) && home!=='/') throw new Error('SITE_BASE must be a safe /path/');
  await writeFile(path.join(output,'404.html'),`<!doctype html><html lang="nl"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Pagina niet gevonden | BoeteCheck</title><body style="font:18px system-ui;background:#f8fafc;color:#14233b;max-width:640px;margin:15vh auto;padding:24px"><h1>Deze pagina bestaat niet</h1><p>Controleer het adres of ga terug naar BoeteCheck.</p><a href="${home}">Naar de homepage</a></body></html>`);
  console.log(`Built ${pages.length} pages in ${output}`);
}
if(process.argv[1]===fileURLToPath(import.meta.url)) await build();
