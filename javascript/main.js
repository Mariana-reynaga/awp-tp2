let titulo = document.getElementById("buscador");
const form = document.getElementById("formBuscar");
let tarjeta = document.getElementById("tarjeta");


let palabras=[];
let datosPelis=[];
let datosPeliIndv=[];
let favoritos=[];

let peliculas = 'https://www.omdbapi.com/?s=&type=movie&apikey=301ed5d1';
let pelicula = 'https://www.omdbapi.com/?i=&apikey=301ed5d1';

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    palabras = titulo.value.split(" ");

    let nombre = palabras.join('+');

    peliculas = `http://www.omdbapi.com/?s=${nombre}&type=movie&apikey=301ed5d1`;

    console.log(pelicula);

    getPelis();
});


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
        
        imprimirPoster(datosPelis);
    
        console.log(datosPelis[0]);
    }

} 

function imprimirPoster(datosPelis){
    tarjeta.innerHTML=` `;

    datosPelis[0].forEach(peli => {
        tarjeta.innerHTML+=
            `<div class="d-flex align-items-center flex-column my-2">
                <img src="${peli.Poster}" class="img-thumbnail">
                <h2>${peli.Title}</h2>
                <button class="btn" onclick="peliIndv(this)" data-id="${peli.imdbID}">Ver más</button>
            </div>`;
    
    });
};

function peliIndv(id){
    let peli = id.getAttribute("data-id")

    pelicula = `https://www.omdbapi.com/?i=${peli}&apikey=301ed5d1`;

    console.log(peli);

    getPeliIndv();
}

const getPeliIndv = async()=>{
    
    let ruta = pelicula;
    const response = await fetch(ruta);
    const dataIndv = await response.json();
    
    if (dataIndv.Response == "False") {
        imprimirError()
        
    } else {
        datosPeliIndv=[];

        datosPeliIndv.push(dataIndv);
        
        imprimirModal();

        console.log(datosPeliIndv[0]);
    }

} 


function imprimirModal(){
    tarjeta.innerHTML=` `;

    tarjeta.innerHTML= `
        <img src="${datosPeliIndv[0].Poster}" style="height: 500px; height: 500px;">

        <div class="container-fluid d-flex flex-column mt-md-3 mt-lg-0 m-0 justify-content-md-center align-items-md-center  justify-content-lg-evenly">
            <h1 class="text-center">${datosPeliIndv[0].Title}</h1>
                
            <div class="container d-flex justify-content-center">
                <ul class="list-group" style="width: 80%;">
                    <li class="list-group-item">Estreno: ${datosPeliIndv[0].Released} </li>
                    <li class="list-group-item">Director: ${datosPeliIndv[0].Director}</li>
                    <li class="list-group-item">Duración: ${datosPeliIndv[0].Runtime} </li>
                </ul>
            </div>

            <div class="mt-md-4 mt-lg-0" id="sinopsis">
                <h2 class="fw-semibold fs-3" >Sinopsis:</h2>
                <p>${datosPeliIndv[0].Plot}</p>
            </div>

        </div>`;
}

// function imprimirPoster(datosPeli){
//     tarjeta.innerHTML=` `;
    
//     tarjeta.innerHTML=`
//         <img src="${datosPeli[0].Poster}" style="height: 500px; height: 500px;">

//         <div class="container-fluid d-flex flex-column mt-md-3 mt-lg-0 m-0 justify-content-md-center align-items-md-center  justify-content-lg-evenly">
//             <h1 class="text-center">${datosPeli[0].Title}</h1>
                
//             <div class="container d-flex justify-content-center">
//                 <ul class="list-group" style="width: 80%;">
//                     <li class="list-group-item">Estreno: ${datosPeli[0].Released} </li>
//                     <li class="list-group-item">Director: ${datosPeli[0].Director}</li>
//                     <li class="list-group-item">Duración: ${datosPeli[0].Runtime} </li>
//                 </ul>
//             </div>

//             <div class="mt-md-4 mt-lg-0" id="sinopsis">
//                 <h2 class="fw-semibold fs-3" >Sinopsis:</h2>
//                 <p>${datosPeli[0].Plot}</p>
//             </div>

//         </div>`
// };

function imprimirError() {
    tarjeta.innerHTML=` `;
    tarjeta.innerHTML=`<h2>Ocurrio un Error. Porfavor Ingresar un Titulo Valido.</h2>`;
}