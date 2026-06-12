//declaro primero mis URL de los personajes
const URLPersonajes = "https://thesimpsonsapi.com/api/characters";
const URLDetalles = "https://thesimpsonsapi.com/api/characters/";
const URlImagenes = "https://cdn.thesimpsonsapi.com/500";

let personajes = [];
const miContenedor = document.querySelector("#coleccionPersonajes");
console.log(miContenedor);
const contenedor = document.querySelector("#coleccionPersonajes");

const obternerMisPersonajes = async () => {
  try {
    const respuesta = await fetch(URLPersonajes);
    const datos = await respuesta.json();
    personajes = datos.results;
    personajes.forEach(function (personaje) {
      const columna = document.createElement("div");
      columna.className = "col-md-4";
      columna.innerHTML = `
      <div class="card">
      <img src = "${URlImagenes}${personaje.portrait_path}" class = "card-img-top" alt="${personaje.name}">
        <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            <p class = "card-text"> ${personaje.occupation}</p>
            <p class = "card-text">${personaje.status}</p>
        </div>
    </div>
      `;
      miContenedor.appendChild(columna);
    });
    console.log(personajes);
  } catch (error) {
    console.log("hay errores axel" + error);
  }
};

// funcion cargar personajes

document.addEventListener("DOMContentLoaded", obternerMisPersonajes);
