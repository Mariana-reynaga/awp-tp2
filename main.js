let titulo = document.getElementById("buscador");
const form = document.getElementById("formBuscar");
let tarjeta = document.getElementById("tarjeta");

let palabras=[];
let datosPelis=[];
let datosPeliIndv=[];
let favoritos=[];

// console.log(JSON.parse(localStorage.getItem("favoritos"))[0].id)

let peliculas = 'https://www.omdbapi.com/?s=&type=movie&apikey=301ed5d1';
let pelicula = 'https://www.omdbapi.com/?i=&apikey=301ed5d1';


if (navigator.onLine) {
    //Evento que escucha que busca el usuario
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        
        palabras = titulo.value.split(" ");
    
        let nombre = palabras.join('+');
    
        peliculas = `https://www.omdbapi.com/?s=${nombre}&type=movie&apikey=301ed5d1`;
    
        console.log(pelicula);
    
        getPelis();
    });
    
    //trae todas las peliculas que coinciden con la busqueda
    const getPelis = async()=>{
        
        let ruta = peliculas;
        const response = await fetch(ruta);
        const data = await response.json();
        
        console.log(data.Search)
    
        if (data.Response == "False") {
            imprimirError()
            
        } else {
            datosPelis=[];
            datosPelis.push(data.Search);
            
            imprimirPeliculas(datosPelis);
        
            console.log(datosPelis[0]);
        }
    
    } 
    
    //imprime todas las peliculas
    function imprimirPeliculas(datosPelis){
        tarjeta.innerHTML=` `;
    
        datosPelis[0].forEach(peli => {
            tarjeta.innerHTML+=`
                <div class="d-flex align-items-center flex-column p-2 m-2 bg-info rounded" style="width:18rem;">
                    <img src="${peli.Poster}" class="img-thumbnail">
                    <h2>${peli.Title}</h2>
                    <button class="btn" onclick="peliIndv(this)" data-id="${peli.imdbID}">Ver más</button>
                </div>`;
        
        });
    };
    
    //Cuando el usuario clickea el btn 'ver más', hace un fetch a la API 
    function peliIndv(id){
        let peli = id.getAttribute("data-id")
    
        pelicula = `https://www.omdbapi.com/?i=${peli}&apikey=301ed5d1`;
    
        getPeliIndv();
    }
    
    //Guarda los datos de la pelicula individual
    const getPeliIndv = async()=>{
        
        let ruta = pelicula;
        const response = await fetch(ruta);
        const dataIndv = await response.json();
        
        if (dataIndv.Response == "False") {
            imprimirError()
            
        } else {
            datosPeliIndv=[];
    
            datosPeliIndv.push(dataIndv);
            
            imprimirDatos();
    
            console.log(datosPeliIndv[0]);
        }
    
    } 
    
    //Imprime la tarjeta con los datos de la peli individual
    function imprimirDatos(){
        tarjeta.innerHTML=` `;
        
        tarjeta.innerHTML= `
            <img src="${datosPeliIndv[0].Poster}" style="height: 500px; height: 500px;">
    
            <div class="container-fluid d-flex flex-column mt-md-3 mt-lg-0 m-0 justify-content-md-center align-items-md-center   justify-content-lg-evenly">
                <h1 class="text-center">${datosPeliIndv[0].Title}</h1>
                    
                <div class="container d-flex justify-content-center">
                    <ul class="list-group" style="width: 80%;">
                        <li class="list-group-item">Estreno: ${datosPeliIndv[0].Released} </li>
                        <li class="list-group-item">Director: ${datosPeliIndv[0].Director}</li>
                        <li class="list-group-item">Duración: ${datosPeliIndv[0].Runtime} </li>
                    </ul>
                </div>
    
                <div class="mt-md-4 mt-lg-0" id="sinopsis">
                    <h2 class="fw-semibold fs-3 mt-2" >Sinopsis:</h2>
                    <p>${datosPeliIndv[0].Plot}</p>
                </div>

                <div class="d-flex justify-content-center">
                    <button class="btn" onclick="añadirFav()" data-id="${datosPeliIndv[0].imdbID}">
                        Añadir a favoritos
                    </button>
                </div>
            </div>
            `;
    }

    function añadirFav(){
        let historialFavs = localStorage.getItem("favoritos");

        if (historialFavs) {
            favoritos = JSON.parse(historialFavs);
            
        }else{
            favoritos = [];
           
        }

        favoritos.push({
            id: datosPeliIndv[0].imdbID,
            titulo: datosPeliIndv[0].Title,
            poster: datosPeliIndv[0].Poster
        });

        window.localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    function favEmpty(){
        tarjeta.innerHTML=` `;
        tarjeta.innerHTML=`<h2>No hay películas en favoritos</h2>`;
    }

    function TraerFav(){
        listaFavs = [];

        const local = localStorage.getItem("favoritos");

        if (local !== null ) {
            if (local.length > 2) {
                listaFavs = JSON.parse(local);
    
                imprimirFavs();

            }else{
                favEmpty()
            }
            
        }else{
            favEmpty()
        }
    }

    function imprimirFavs(){
        tarjeta.innerHTML=` `;
        
        listaFavs.forEach((peli, index) => {
            tarjeta.innerHTML+=`
                <div class="d-flex align-items-center flex-column p-2 m-2 bg-info rounded" style="width:18rem;">
                    <img src="${peli.poster}" class="img-thumbnail">
                    <h2>${peli.titulo}</h2>
                    <button class="btn" onclick="peliIndv(this)" data-id="${peli.id}" >Ver más</button>
                    <button class="btn mt-2" onclick="elim(this)" data-index="${index}">Eliminar</button>
                </div>`;
        
        });
    }


    function elim(ar){
        let lista = JSON.parse(localStorage.getItem("favoritos"));

        const item = ar.getAttribute("data-index")

        let del = lista.splice(item,1)

        console.log(lista)

        window.localStorage.setItem('favoritos', JSON.stringify(lista));

        TraerFav()
    }



} else {
    tarjeta.innerHTML=` `;

    tarjeta.innerHTML=` <h2>Conexión Perdida, espere a conectarse de vuelta para realizar busquedas.</h2>`;
}


//En caso de que el titulo no sea valido imprime el error
function imprimirError() {
    tarjeta.innerHTML=` `;
    tarjeta.innerHTML=`<h2>Ocurrio un Error. Porfavor Ingresar un Titulo Valido.</h2>`;
}

//service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}else{
    alert("Este browser no soporta esta tecnologia")
}