const CACHE_NAME = "calc-suite-cache-v1";
const urlsToCache = [
  "./",
  "index.html",
  "style.css",
  "func.js",
  "ou.js",
  "zscore.js",
  "flex.js",
  "site.js",
  "manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
