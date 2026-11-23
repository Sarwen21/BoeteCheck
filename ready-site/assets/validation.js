/** Pure validation rules, shared by the form and automated tests.
 * Client checks improve feedback; a future backend must repeat these checks.
 */
export const MAX_FILES=3;
export const MAX_BYTES=10*1024*1024;
export function fileError(file){
  if(file.size===0) return 'Dit bestand is leeg.';
  if(file.size>MAX_BYTES) return 'Een bestand mag maximaal 10 MB zijn.';
  const match=/\.(jpe?g|png|pdf)$/i.exec(file.name);
  if(!match) return 'Kies een JPG-, PNG- of PDF-bestand.';
  const types={jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',pdf:'application/pdf'};
  if(file.type&&file.type!==types[match[1].toLowerCase()]) return 'Het bestandstype past niet bij de bestandsnaam.';
  return '';
}
export function validateStep(step, data, files){
  if(step===0){
    if(!['snelheid','rood','telefoon','parkeren','overig'].includes(data.fineType)) return 'Kies het soort boete.';
    if(!['M','O','anders','onbekend'].includes(data.letter)) return 'Kies de letter op je boete, of “Weet ik niet”.';
  }
  if(step===1&&data.amount&&(!Number.isFinite(Number(data.amount))||Number(data.amount)<=0||Number(data.amount)>100000)) return 'Vul een geldig bedrag in dat groter is dan nul.';
  if(step===2){
    if(!files.length) return 'Kies een foto of pdf van je boete.';
    if(files.length>MAX_FILES) return 'Je kunt maximaal 3 bestanden kiezen.';
    for(const file of files){const error=fileError(file);if(error)return error;}
  }
  if(step===4){
    if(!data.fullName?.trim()) return 'Vul je naam in.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email||'')) return 'Vul een geldig e-mailadres in.';
    if(!data.privacy) return 'Lees de privacyverklaring en bevestig dat je begrijpt dat dit een voorbeeld is.';
  }
  return '';
}
