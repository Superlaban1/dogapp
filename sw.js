const CACHE = "static-v1";

const FILES = [
  "./",
  "./index.html",
  "./assets/css/site.css",
  "./assets/js/site.js",
  "./assets/img/dog.png",
  "./dog.json",
];

self.addEventListener("install", (event) => {
  console.log("Service worker: install");
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(FILES))
  );
});

self.addEventListener("activate", () => {
  console.log("Service worker: activate");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(event.request);
        if (networkResponse && networkResponse.status === 200) {
          const cache = await caches.open(CACHE);
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        console.log("Network failed, fetching from cache:", event.request.url);
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        throw error;
      }
    })()
  );
});
