console.log("conectado el sw");

self.addEventListener("install", (e)=>{
    e.waitUntil(caches);
})

self.addEventListener('activate', (evento) => {
    caches.open("buscadorFiles").then(data=>{
        return data.addAll([
            '/',
            '/index.html',
            '/main.js',
            'README.md',
            'estilos/estilos.css',
            '/sw.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
            '/icons',
            '/manifest.json',
            '/browserconfig.xml'
        ]);
    });

    console.log('se activo el service worker');
})

self.addEventListener("fetch",(e)=>{
    const respuestaCache = fetch(e.request).then(respuestaNet =>{
        return caches.open('buscadorFiles').then(data=>{
            data.put(e.request, respuestaNet.clone());
            return respuestaNet;
        })
    }).catch(error =>{
        return caches.match(e.request);
    })

    e.respondWith(respuestaCache);
})