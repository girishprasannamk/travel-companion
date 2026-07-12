// Offline-first service worker for Travel Companion.
// Strategy: stale-while-revalidate for same-origin GET requests.
// App data lives in localStorage (zustand persist), so revisits work offline
// as long as the shell/assets are cached.
//
// Base-path aware: derives the repo sub-path (e.g. /travel-companion) from the
// current location so the same file works on GitHub Pages, Vercel and Firebase
// with no code changes.

const CACHE = "tc-cache-v1";

// Derive the app base path from the current URL (handles GitHub Pages sub-path).
function appBase() {
  var path = self.location.pathname;
  var idx = path.indexOf("/sw.js");
  var base = idx >= 0 ? path.slice(0, idx) : "";
  return base; // e.g. "" locally, "/travel-companion" on project Pages
}

function coreUrls() {
  var base = appBase();
  return [base + "/", base + "/manifest.webmanifest", base + "/favicon.ico"];
}

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE)
      .then(function (c) {
        return c.addAll(coreUrls());
      })
      .catch(function () {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (k) {
              return k !== CACHE;
            })
            .map(function (k) {
              return caches.delete(k);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(req).then(function (cached) {
        var network = fetch(req)
          .then(function (res) {
            if (res && res.status === 200) {
              cache.put(req, res.clone());
            }
            return res;
          })
          .catch(function () {
            return cached;
          });
        return cached || network;
      });
    })
  );
});
