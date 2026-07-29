// Claude Code Guide — network-first service worker (fresh online, offline-capable).
const CACHE='ccg-v1';
const ASSETS=['/claude-code-guide/','/claude-code-guide/index.html','/claude-code-guide/manifest.webmanifest','/claude-code-guide/icon-192.png','/claude-code-guide/icon-512.png','/claude-code-guide/icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET')return; if(new URL(e.request.url).origin!==self.location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(h=>h||caches.match('/claude-code-guide/index.html')))); });
