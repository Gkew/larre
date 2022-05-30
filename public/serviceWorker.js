// updated static and dynamic cache to version 2
const STATIC_CACHE = 'static-cache-v2'
const DYNAMIC_CACHE = 'dynamic-cache-v2'

self.addEventListener('activate', evt => {
  evt.waitUntil(activateEvent())
})

async function activateEvent() {
  // get all caches
  let cacheKeys = await caches.keys()

  // remove old cache
  cacheKeys = cacheKeys.filter(cache => (cache != STATIC_CACHE && cache != DYNAMIC_CACHE))
  await Promise.all(cacheKeys.map(cache => caches.delete(cache)))
}

self.addEventListener('fetch', evt => {
  // only handle GET
  if (evt.request.method != 'GET') return

  e.respondWith(onFetch(evt))
})

async function onFetch(evt) {
  // try to fetch response and cache it
  try {
    let res = await fetch(evt.request)
    let cache = await caches.open(DYNAMIC_CACHE)

    // need to clone the response, else it'll get consumed
    // and cannot be sent back to the client
    await cache.put(evt.request, res.clone())

    return res
  }
  catch {
    // if offline, return the cached response
    return await caches.match(evt.request)
  }
}