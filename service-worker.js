const CACHE_NAME = "footballleague-v3";
const urlToCache = [
  "/",
  "/index.html",
  "/src/pages/bookmark.html",
  "/src/pages/home.html",
  "/src/pages/matches.html",
  "/src/pages/standings.html",

  "/src/idb/idb.js",
  "/src/script/components/app-navbar.js",
  "/src/script/db.js",
  "/src/script/api.js",
  "/src/script/main.js",
  "/src/script/renderPages.js",

  "/src/assets/aticon/apple-touch-icon-ipad-76x76.png",
  "/src/assets/aticon/apple-touch-icon-ipad-retina-152x152.png",
  "/src/assets/aticon/apple-touch-icon-iphone-60x60.png",
  "/src/assets/aticon/apple-touch-icon-iphone-retina-120x120.png",

  "/src/assets/images/banner.jpg",
  "/src/assets/images/premier-league.svg",

  "/src/assets/logo/favicon.ico",
  "/src/assets/logo/logo-full.png",
  "/src/assets/logo/mask.png",

  "/src/materialize/materialize.min.css",
  "/src/materialize/materialize.min.js",

  "/src/css/style.css",
  "/service-worker.js",
  "https://use.fontawesome.com/releases/v5.15.1/css/all.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700;900&display=swap"
];


self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(urlToCache);
    })
  );
})

self.addEventListener("fetch", function(event){
  event.respondWith(
    caches
      .match(event.request, {cacheName: CACHE_NAME})
        .then(function(response){
          if(response){
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }

          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );

          return fetch(event.request);

        })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(cachesNames){
      return Promise.all(
        cachesNames.map(function(cacheName){
          if(cacheName !== CACHE_NAME){
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      )
    })
  );
});