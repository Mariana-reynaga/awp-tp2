console.log("conectado el sw");

self.addEventListener("install", (e)=>{
    caches.open("buscadorFiles").then(data=>{
        return data.addAll([
            '/',
            '/index.html',
            '/javascript/main.js',
            'README.md',
            'estilos/estilos.css',
            '/sw.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
            '/icons',
            '/manifest.json',
            'browserconfig.xml'
        ]);
    });

    e.waitUntil(caches);
})

self.addEventListener('activate', (evento) => {
    console.log('se activo el service worker');
})

self.addEventListener("fetch",(e)=>{
    const respuestaCache = fetch(e.request).then(networkResponse=>{
        return caches.open(e.request).then(cache=>{
            cache.put(e.request, networkResponse.clone() );
            return networkResponse
        })
    }).catch(error =>{
        
        console.log("solo si no estoy conectado a wifi");
        return caches.match(e.request)
    })

    e.respondWith(respuestaCache);
})