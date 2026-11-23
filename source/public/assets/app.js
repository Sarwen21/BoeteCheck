/** SMALL SHARED BEHAVIOURS: mobile navigation, cookie choice, and form startup.
 * No external scripts, trackers, fonts or runtime packages are required.
 */
import {initialiseWizard} from './wizard.js';
const toggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){toggle?.setAttribute('aria-expanded','false');navigation?.classList.remove('is-open');toggle?.setAttribute('aria-label','Menu openen');}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Menu sluiten':'Menu openen');navigation.classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
matchMedia('(min-width:801px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

const key='boetecheck-cookie-choice-v1';
let choice=null;
try{const stored=localStorage.getItem(key);if(['all','necessary'].includes(stored))choice=stored;}catch{/* Storage can be disabled; the site must still work. */}
function updateCookies(){
  document.querySelector('#cookie-banner').hidden=Boolean(choice);
  const status=document.querySelector('#cookie-status');
  if(status)status.textContent=choice==='all'?'alles geaccepteerd (geen meetdienst actief)':choice==='necessary'?'alleen noodzakelijk':'nog geen keuze';
}
document.querySelectorAll('[data-cookie]').forEach(button=>button.addEventListener('click',()=>{choice=button.dataset.cookie;try{localStorage.setItem(key,choice);}catch{}updateCookies();const feedback=document.querySelector('#cookie-feedback');if(feedback)feedback.textContent='Je keuze is aangepast.';}));
updateCookies();
initialiseWizard();
