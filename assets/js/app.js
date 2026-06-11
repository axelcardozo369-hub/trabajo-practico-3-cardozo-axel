//declaro primero mis URL de los personajes
const URLPersonajes = "https://thesimpsonsapi.com/api/characters";
const URLDetalles = "https://thesimpsonsapi.com/api/characters/";

let personajes = [];
const obternerMisPersonajes = async () => {
  try {
    const respuesta = await fetch(URLPersonajes);
    const datos = await respuesta.json();
    personajes = datos.results;
    console.log( "Si ves esto, mi codigo funciona ",personajes);
  } catch (error) {
    console.log("hay errores axel" + error);
  }
};
document.addEventListener("DOMContentLoaded", obternerMisPersonajes);
