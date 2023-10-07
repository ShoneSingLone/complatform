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

self.addEventListener("fetch", e => {
	/* if (
		e.request.url ===
		`https://www.singlone.work/s/api/public/assets/AllMusicClient.json`
	) {
		e.respondWith(
			(async () => {
				const r = await caches.match(e.request);
				if (r) {
					return r;
				}
				const response = await fetch(e.request);
				const cache = await caches.open(__APP_VERSION);
				console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
				cache.put(e.request, response.clone());
				return response;
			})()
		);
	} */
});