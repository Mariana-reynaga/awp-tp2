let titulo = document.getElementById("buscador");
const form = document.getElementById("formBuscar");
let tarjeta = document.getElementById("tarjeta");


let palabras=[];
let datosPeli=[];
let favoritos=[];

let peliculas = 'https://www.omdbapi.com/?s=&type=movie&apikey=301ed5d1';
let pelicula = 'https://www.omdbapi.com/?t=&apikey=301ed5d1';

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
        datosPeli=[];
        datosPeli.push(data.Search);
        
        imprimirPoster(datosPeli);
    
        console.log(datosPeli);

        console.log(datosPeli[0]);
    }

} 

function imprimirPoster(datosPeli){
    tarjeta.innerHTML=` `;

    datosPeli[0].forEach(peli => {
        console.log(peli)
        tarjeta.innerHTML+=
            `<div class="d-flex align-items-center flex-column my-2">
                <img src="${peli.Poster}" class="img-thumbnail">
                <h2>${peli.Title}</h2>
                
            </div>`;
    
    });
};

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