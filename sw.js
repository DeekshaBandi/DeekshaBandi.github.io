// Network first, so visitors always get the latest site; the cached copy is only for offline use.
const CACHE = 'md-viewer-2.0.1';
const APP_FILES = ['./', 'index.html', 'app.js', 'welcome.js', 'd2-sandbox.html', 'd2-sandbox.js', 'manifest.webmanifest',
  'icons/icon.svg', 'icons/icon32.png', 'icons/icon192.png', 'icons/icon512.png',
  'lib/purify.min.js', 'lib/marked.min.js', 'lib/editor.bundle.js', 'lib/highlight.min.js', 'lib/mermaid.min.js', 'lib/mermaid-elk.js',
  'lib/d2.js', 'lib/d2-worker.js', 'lib/d2-setup.js', 'lib/elk.js', 'lib/viz.js', 'lib/katex/katex.min.js', 'lib/katex/katex.min.css',
  ...['KaTeX_AMS-Regular','KaTeX_Caligraphic-Bold','KaTeX_Caligraphic-Regular','KaTeX_Fraktur-Bold','KaTeX_Fraktur-Regular','KaTeX_Main-Bold','KaTeX_Main-BoldItalic','KaTeX_Main-Italic','KaTeX_Main-Regular','KaTeX_Math-BoldItalic','KaTeX_Math-Italic','KaTeX_SansSerif-Bold','KaTeX_SansSerif-Italic','KaTeX_SansSerif-Regular','KaTeX_Script-Regular','KaTeX_Size1-Regular','KaTeX_Size2-Regular','KaTeX_Size3-Regular','KaTeX_Size4-Regular','KaTeX_Typewriter-Regular'].map((f) => `lib/katex/fonts/${f}.woff2`)];

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(
  caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
));
// The full app is stored only after it is installed, so ordinary visitors don't download it all
self.addEventListener('message', (e) => {
  if (e.data === 'cache-app') e.waitUntil(caches.open(CACHE).then((c) => c.addAll(APP_FILES)));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((res) => {
    // Only an installed app has a cache; keep it current. Ordinary visits store nothing.
    if (res.ok) { const copy = res.clone(); e.waitUntil(caches.has(CACHE).then((has) => has && caches.open(CACHE).then((c) => c.put(e.request, copy)))); }
    return res;
  }).catch(async () => (await caches.match(e.request, { ignoreSearch: e.request.mode === 'navigate' }))
    || (e.request.mode === 'navigate' && await caches.match('./')) || Response.error()));
});
