if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js",
  )
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded")

    // matches a properly formed URL
    const regexUrl = "(?:https://.*)?"

    // cache data fetched from content api
    workbox.routing.registerRoute(
      new RegExp(`${regexUrl}/publication/.*`),
      workbox.strategies.cacheFirst({
        cacheName: "publication-route",
      }),
    )

    // image caching
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 20,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      }),
    )

    // css caching
    workbox.routing.registerRoute(
      /\.(?:css)$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: "css",
      }),
    )

    // js caching
    workbox.routing.registerRoute(
      /\.(?:js)$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: "javascript",
      }),
    )

    // font caching
    workbox.routing.registerRoute(
      /\.(?:woff|woff2|eot|ttf)$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: "fonts",
      }),
    )
  } else {
    console.log("Workbox could not be loaded. No Offline support")
  }
}

// below command would cache *everything* per https://developers.google.com/web/tools/workbox/guides/precache-files/webpack
// workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
