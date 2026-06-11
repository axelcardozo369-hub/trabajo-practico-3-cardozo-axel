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
    console.log(personajes);
  } catch (error) {
    console.log("hay errores axel" + error);
  }
};

// funcion cargar personajes

document.addEventListener("DOMContentLoaded", obternerMisPersonajes);
