/** Local preview server. It deliberately does NOT fall back to index.html:
 * missing URLs must fail here too, so GitHub Pages problems can be caught early.
 * Open /BoeteCheck/ to test the exact repository-subfolder arrangement.
 */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.json':'application/json'};
const server=http.createServer(async(req,res)=>{
  try{
    let urlPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(urlPath==='/BoeteCheck'){res.writeHead(301,{Location:'/BoeteCheck/'});res.end();return;}
    if(urlPath.startsWith('/BoeteCheck/')) urlPath=urlPath.slice('/BoeteCheck'.length);
    const file=path.resolve(root,'.'+urlPath);
    if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}
    const info=await stat(file);
    if(info.isDirectory()&&!urlPath.endsWith('/')){res.writeHead(301,{Location:new URL(req.url,'http://localhost').pathname+'/'});res.end();return;}
    const target=info.isDirectory()?path.join(file,'index.html'):file;
    const body=await readFile(target);
    res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(body);
  }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html')));}
});
server.listen(4173,'127.0.0.1',()=>console.log('BoeteCheck preview: http://127.0.0.1:4173/BoeteCheck/'));
