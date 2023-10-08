const contentToCache = CONTENT_TO_CACHE || [];

self.addEventListener("install", e => {
	console.log("[Service Worker] Install");
	e.waitUntil(
		(async () => {
			const cache = await caches.open(__APP_VERSION);
			console.log("[Service Worker] Caching all: app shell and content");
			await cache.addAll(contentToCache);
		})()
	);
});

self.addEventListener("fetch", e => { });