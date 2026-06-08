//declaro primero mis URL de los personajes
const URLPersonajes = "https://thesimpsonsapi.com/api/characters";
const URLDetalles = "https://thesimpsonsapi.com/api/characters/";

let personajes = [];
const miContenedor = document.querySelector("#coleccionPersonajes");
console.log(miContenedor);
const contenedor = document.querySelector("#coleccionPersonajes");

const obternerMisPersonajes = async () => {
  try {
    const respuesta = await fetch(URLPersonajes);
    const datos = await respuesta.json();
    personajes = datos.results;
    contenedor.innerHTML = "";
    personajes.forEach((personaje) => {
      contenedor.innerHTML += `
      <div class="card" style="width: 18rem;">
  <img src="personajes.img" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Título de la tarjeta</h5>
    <p class="card-text">Un breve texto de ejemplo para mostrar en el título de la tarjeta y componer la mayor parte del contenido de la tarjeta.</p>
    <a href="#" class="btn btn-primary">Ir a algún lugar</a>
  </div>
</div>
`;
    });
    console.log(personajes);
  } catch (error) {
    console.log("hay errores axel" + error);
  }
};

// funcion cargar personajes

document.addEventListener("DOMContentLoaded", obternerMisPersonajes);
