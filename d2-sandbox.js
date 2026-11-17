// Only messages from the embedding page are handled; replies go to its extension origin when the browser reports it.
var parentOrigin = (location.ancestorOrigins && /^(chrome|ms-browser)-extension:/.test(location.ancestorOrigins[0] || '')) ? location.ancestorOrigins[0] : '*';
addEventListener('message', function (e) { if (e.source !== parent) e.stopImmediatePropagation(); }, true);
// Gives lib/d2-worker.js a worker-like port: messages from the parent arrive natively, replies go to the parent.
var nativePost = self.postMessage.bind(self);
self.postMessage = function (m, t) { t === '*' ? nativePost(m, '*') : parent.postMessage(m, parentOrigin); };
