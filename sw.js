console.log("conectado el sw");

const cacheNom = 'files';
const cacheAssets = [
    '/',
    'estilos/estilos.css',
    'icons',
    'browserconfig.xml',
    'index.html',
    'main.js',
    'manifest.json',
    'README.md',
    'sw.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
];

self.addEventListener('install', (evento)=> {
    const cache =  caches.open(cacheNom).then( (cache) => {
        return cache.addAll( cacheAssets )
    })
    
    evento.waitUntil( cache );
})

self.addEventListener('activate', (evento) => {
    console.log('SW activado  dds');
})

self.addEventListener("fetch",(e)=>{
    const respuestaCache = fetch(e.request).then((respuestaNet) =>{
        return caches.open(cacheNom).then((data)=>{
            data.put(e.request, respuestaNet.clone());
            return respuestaNet;
        })
        
    }).catch( () =>{
        return caches.match(e.request);
    })

    e.respondWith(  respuestaCache  ); 
})