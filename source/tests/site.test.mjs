/** Regression checks for the migration's main risks: broken nested URLs,
 * missing assets, external runtime dependencies, and upload/form validation.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,stat,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {build} from '../scripts/build.mjs';
import {pages} from '../src/pages.mjs';
import {fileError,validateStep,MAX_BYTES} from '../public/assets/validation.js';

test('every page and relative link resolves under root AND GitHub project paths',async()=>{
  const output=await mkdtemp(path.join(os.tmpdir(),'boetecheck-test-'));
  try{
    await build(output);
    assert.equal(pages.length,15);
    for(const base of ['/','/BoeteCheck/'])for(const page of pages){
      const file=path.join(output,page.route,'index.html');
      const html=await readFile(file,'utf8');
      assert.match(html,/<html lang="nl">/);assert.match(html,/<main id="main">/);
      assert.equal((html.match(/<h1[ >]/g)||[]).length,1,page.route);
      const url=new URL(base+(page.route?page.route+'/':''),'https://example.test');
      for(const [,link]of html.matchAll(/(?:href|src)="([^"]+)"/g)){
        if(link.startsWith('#')||link.startsWith('https://'))continue;
        assert.ok(!link.startsWith('/'),`Root-relative link in ${page.route}: ${link}`);
        const resolved=new URL(link,url);
        assert.ok(resolved.pathname.startsWith(base),`Link escapes ${base}: ${link}`);
        const local=path.join(output,decodeURIComponent(resolved.pathname.slice(base.length)));
        const info=await stat(local);
        if(info.isDirectory())await stat(path.join(local,'index.html'));
      }
      assert.ok(!/<script[^>]+src="https?:/i.test(html));
      assert.ok(!/<link[^>]+href="https?:/i.test(html));
    }
  }finally{await rm(output,{recursive:true,force:true});}
});
test('file validation accepts supported documents and enforces boundaries',()=>{
  const valid={name:'fine.pdf',type:'application/pdf',size:MAX_BYTES};
  assert.equal(fileError(valid),'');
  assert.ok(fileError({...valid,size:MAX_BYTES+1}));
  assert.ok(fileError({...valid,size:0}));
  assert.ok(fileError({...valid,name:'fine.html'}));
  assert.ok(fileError({...valid,type:'image/png'}));
  assert.equal(fileError({name:'fine.JPG',type:'',size:100}),'');
});
test('form requires a category, letter, document, real email and acknowledgement',()=>{
  assert.ok(validateStep(0,{},[]));
  assert.ok(validateStep(0,{fineType:'snelheid'},[]));
  assert.equal(validateStep(0,{fineType:'parkeren',letter:'onbekend'},[]),'');
  assert.ok(validateStep(2,{},[]));
  const pdf={name:'fine.pdf',type:'application/pdf',size:100};
  assert.equal(validateStep(2,{},[pdf]),'');
  assert.ok(validateStep(2,{},[pdf,pdf,pdf,pdf]));
  assert.ok(validateStep(1,{amount:'-1'},[]));
  assert.equal(validateStep(1,{},[]),'');
  assert.ok(validateStep(4,{fullName:'Test',email:'bad',privacy:'on'},[]));
  assert.ok(validateStep(4,{fullName:'Test',email:'test@example.com'},[]));
  assert.equal(validateStep(4,{fullName:'Test',email:'test@example.com',privacy:'on'},[]),'');
});
