/** FIVE-STEP FORM
 * Only this module handles form state and file selection. Nothing is uploaded,
 * emailed, or saved in localStorage. Refreshing clears all entered data.
 * A future real submission belongs in a separate backend adapter (BACKEND.md).
 */
import { fileError, MAX_FILES, validateStep } from './validation.js';

export function initialiseWizard(){
  const form=document.querySelector('#fine-form');
  if(!form)return;
  let step=0;
  let files=[];
  let finished=false;
  const panels=[...form.querySelectorAll('[data-step]')];
  const error=document.querySelector('#form-error');
  const next=document.querySelector('#next');
  const back=document.querySelector('#back');
  const input=document.querySelector('#documents');
  const result=document.querySelector('#form-result');
  const data=()=>Object.fromEntries(new FormData(form));
  const showError=message=>{error.textContent=message;error.hidden=!message;if(message)error.focus();};

  // Construct review rows with textContent; user input is never inserted as HTML.
  function renderReview(){
    const values=data();
    const category=form.querySelector('input[name="fineType"]:checked')?.closest('label').innerText.trim();
    const rows=[['Soort boete',category],['Letter',values.letter],['Datum',values.fineDate],['Bedrag',values.amount?'€ '+values.amount:''],['Omschrijving',values.offence],['CJIB-nummer',values.cjib],['Uiterste datum',values.deadline],['Bestanden',files.map(f=>f.name).join(', ')],['Toelichting',values.explanation]];
    const review=document.querySelector('#review');review.replaceChildren();
    for(const [label,value]of rows){const dt=document.createElement('dt');dt.textContent=label;const dd=document.createElement('dd');dd.textContent=value||'Niet ingevuld';review.append(dt,dd);}
  }
  function showStep(focus=true){
    // Hidden panels retain their values. We validate only the visible panel,
    // keeping later required contact fields from blocking an earlier step.
    panels.forEach((panel,i)=>{panel.hidden=i!==step;});
    document.querySelectorAll('[data-progress]').forEach((item,i)=>{item.classList.toggle('complete',i<step);if(i===step)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');});
    back.hidden=step===0;next.textContent=step===4?'Voorbeeld afronden':'Volgende';
    document.querySelector('#step-status').textContent=`Stap ${step+1} van 5`;
    showError('');if(step===4)renderReview();if(focus)panels[step].querySelector('h2').focus();
  }
  function renderFiles(){
    const list=document.querySelector('#file-list');list.replaceChildren();
    files.forEach((file,index)=>{const li=document.createElement('li');const text=document.createElement('span');text.textContent=`${file.name} (${(file.size/1024/1024).toFixed(2)} MB)`;const remove=document.createElement('button');remove.type='button';remove.textContent='Verwijderen';remove.setAttribute('aria-label',`Verwijder ${file.name}`);remove.addEventListener('click',()=>{files.splice(index,1);renderFiles();});li.append(text,remove);list.append(li);});
  }
  function addFiles(incoming){
    const additions=[...incoming].filter(f=>!files.some(old=>old.name===f.name&&old.size===f.size&&old.lastModified===f.lastModified));
    if(files.length+additions.length>MAX_FILES){showError('Je kunt maximaal 3 bestanden kiezen.');return;}
    for(const file of additions){const message=fileError(file);if(message){showError(`${file.name}: ${message}`);return;}}
    files.push(...additions);showError('');renderFiles();
  }
  input.addEventListener('change',()=>{addFiles(input.files);input.value='';});
  const drop=document.querySelector('#drop-zone');
  drop.addEventListener('dragover',event=>{event.preventDefault();drop.classList.add('dragover');});
  drop.addEventListener('dragleave',()=>drop.classList.remove('dragover'));
  drop.addEventListener('drop',event=>{event.preventDefault();drop.classList.remove('dragover');addFiles(event.dataTransfer.files);});
  // Prevent accidental file navigation when someone drops outside the drop zone.
  window.addEventListener('dragover',event=>event.preventDefault());
  window.addEventListener('drop',event=>event.preventDefault());
  back.addEventListener('click',()=>{step=Math.max(0,step-1);showStep();});
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const message=validateStep(step,data(),files);
    if(message){showError(message);return;}
    // Validate native constraints (date, amount precision and field lengths)
    // only on the current panel, so hidden required fields do not block step 1.
    for(const field of panels[step].querySelectorAll('input:not([type=file]),textarea')){
      if(!field.checkValidity()){showError(field.validationMessage);field.focus();return;}
    }
    if(step<4){step++;showStep();return;}
    finished=true;form.hidden=true;result.hidden=false;result.focus();
  });
  form.addEventListener('input',()=>{if(!error.hidden)showError('');});
  document.querySelector('#restart').addEventListener('click',()=>{form.reset();files=[];finished=false;step=0;renderFiles();form.hidden=false;result.hidden=true;showStep();});
  document.querySelector('#download-summary').addEventListener('click',()=>{
    const values=data();
    const labels={fineType:'Soort boete',letter:'Letter',fineDate:'Datum op de boete',amount:'Bedrag',offence:'Omschrijving',cjib:'CJIB-nummer',deadline:'Uiterste datum',explanation:'Toelichting',fullName:'Naam',email:'E-mail',phone:'Telefoon'};
    const text=['BOETECHECK — VOORBEELDOVERZICHT','Niet verstuurd. Geen dossier aangemaakt. Geen officieel bezwaar of beroep.','',...Object.entries(labels).map(([key,label])=>`${label}: ${values[key]||'Niet ingevuld'}`),'',`Bestanden (niet bijgevoegd): ${files.map(f=>f.name).join(', ')}`].join('\n');
    const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='boetecheck-voorbeeld.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  window.addEventListener('beforeunload',event=>{if(!finished&&(files.length||Object.entries(data()).some(([k,v])=>k!=='fineType'&&Boolean(v))))event.preventDefault();});
  const preset=new URLSearchParams(location.search).get('type');
  if(['snelheid','rood','telefoon','parkeren','overig'].includes(preset))form.querySelector(`input[value="${preset}"]`).checked=true;
  showStep(false);
}
