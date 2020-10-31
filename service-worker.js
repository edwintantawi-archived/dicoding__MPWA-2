const CACHE_NAME = "footballleague-v1";
const urlToCache = [
  "/",
  "/index.html",
  "/src/pages/bookmark.html",
  "/src/pages/home.html",
  "/src/pages/matches.html",
  "/src/pages/standings.html",

  "/node_modules/idb/lib/idb.js",
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
  "/src/assets/logo/icont144x144.png",
  "/src/assets/logo/icont512x512.png",

  "/src/materialize/materialize.min.css",
  "/src/materialize/materialize.min.js",

  "/src/css/style.css",
  "/service-worker.js",
  "/manifest.json",
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

  const baseUrl = "https://api.football-data.org/";

  if(event.request.url.indexOf(baseUrl) > -1){
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache){
        return fetch(event.request).then(function(response){
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  }else{
    event.respondWith(
      caches.match(event.request).then(function(response){
        return response || fetch(event.request);
      })
    );
  }

  // event.respondWith(
  //   caches
  //     .match(event.request, {cacheName: CACHE_NAME})
  //       .then(function(response){
  //         if(response){
  //           console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
  //           return response;
  //         }

  //         console.log(
  //           "ServiceWorker: Memuat aset dari server: ",
  //           event.request.url
  //         );

  //         return fetch(event.request);

  //       })
  // );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(cachesNames){
      return Promise.all(
        cachesNames.map(function(cacheName){
          if(cacheName !== CACHE_NAME && cacheName.startsWith("footballleague")){
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      )
    })
  );
});