const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// Set up asset cache to cache JS, CSS, and worker files
registerRoute(
  // Define the filter function that selects which requests to cache
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  // Use the StaleWhileRevalidate strategy to serve cached content while revalidating in the background
  new StaleWhileRevalidate({
    // Use a descriptive cacheName to indicate the purpose of the cache
    cacheName: 'my-asset-cache',
    // Use CacheableResponsePlugin to cache responses with these headers to a maximum-age of 30 days
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      // Use ExpirationPlugin to limit the cache size and age
      new ExpirationPlugin({
        // Set the maximum number of entries in the cache to 60
        maxEntries: 60,
        // Set the maximum age of entries in the cache to 30 days
        maxAgeSeconds: 30 * 24 * 60 * 60, //30 Days
      })
    ],
  })
);
