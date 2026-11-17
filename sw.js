/* Önbellek sürümünü her yayında artır. */
var V = "gelisim-v7";
var CORE = ["./", "index.html", "css/style.css?v=7", "js/content.js?v=7", "js/notes.js?v=7", "js/games.js?v=7", "js/app.js?v=7", "manifest.webmanifest", "icons/icon.svg", "icons/icon-180.png"];
self.addEventListener("install", function (e) { e.waitUntil(caches.open(V).then(function (c) { return c.addAll(CORE); })); self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); })); }));
  self.clients.claim();
});
self.addEventListener("fetch", function (e) {
  var u = new URL(e.request.url);
  if (u.origin !== location.origin) return;
  /* haberler: önce ağ, olmazsa önbellek */
  if (u.pathname.indexOf("/data/") >= 0) {
    e.respondWith(fetch(e.request).then(function (r) { var c = r.clone(); caches.open(V).then(function (ca) { ca.put(e.request, c); }); return r; }).catch(function () { return caches.match(e.request, { ignoreSearch: true }); }));
    return;
  }
  e.respondWith(caches.match(e.request).then(function (m) {
    var f = fetch(e.request).then(function (r) { var c = r.clone(); caches.open(V).then(function (ca) { ca.put(e.request, c); }); return r; }).catch(function () { return m; });
    return m || f;
  }));
});
