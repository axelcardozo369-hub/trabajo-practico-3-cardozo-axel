//declaro primero mis URL de los personajes
const URLPersonajes = "https://thesimpsonsapi.com/api/characters";
const URLDetalles = "https://thesimpsonsapi.com/api/characters/";
const URlImagenes = "https://cdn.thesimpsonsapi.com/500";

let personajes = [];
const miContenedor = document.querySelector("#coleccionPersonajes");
console.log(miContenedor);
const contenedor = document.querySelector("#coleccionPersonajes");
const inputFiltro = document.querySelector("#inputFiltro");
const btnFiltrar = document.querySelector("#btnfiltrar");
const modalPersonajes = new bootstrap.Modal("#modalPersonajes");

const obternerMisPersonajes = async () => {
  try {
    const respuesta = await fetch(URLPersonajes);
    const datos = await respuesta.json();
    personajes = datos.results;
    personajes.forEach(function (personaje) {
      const columna = document.createElement("div");
      let colorStatus = "";
      if (personaje.status === "Alive") {
        colorStatus = "text-success fw-bold";
      } else if (personaje.status === "Deceased") {
        colorStatus = "text-danger fw-bold";
      }
      columna.className = "col-md-4";
      columna.innerHTML = `
      <div class="card">
      <img src = "${URlImagenes}${personaje.portrait_path}" class = "card-img-top"  style = "heigth:100px; width: 200px" alt="${personaje.name}">
        <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            <p class = "card-text"> ${personaje.occupation}</p>
            <p class = "card-text ${colorStatus}">${personaje.status}</p>
            <button class = "btn btn-warning mt-2 btn-detalle" data-id = "${personaje.id}"> Ver detalle del Personaje </button>
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
miContenedor.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-detalle")) {
    const id = e.target.getAttribute("data-id");
    console.log("id del personaje:", id);
    const respuesta =await fetch(URLDetalles + id);
    const detalle = await respuesta.json();
    modalPersonajes.show();
  }
});

btnFiltrar.addEventListener("click", function () {
  const texto = inputFiltro.value.trim().toLowerCase();
  if (texto === "") {
    alert("Escribí un nombre para buscar");
    return;
  }
  const filtrados = personajes.filter(function (personaje) {
    return personaje.name.toLowerCase().includes(texto);
  });
  if (filtrados.length === 0) {
    miContenedor.innerHTML =
      "<p class='text-danger'>No se encontraron personajes</p>";
    return;
  }

  miContenedor.innerHTML = "";
  filtrados.forEach(function (personaje) {
    let colorStatus = "";
    if (personaje.status === "Alive") {
      colorStatus = "text-success fw-bold";
    } else if (personaje.status === "Deceased") {
      colorStatus = "text-danger fw-bold";
    }
    miContenedor.innerHTML += `<div class="card">
      <img src = "${URlImagenes}${personaje.portrait_path}" class = "card-img-top" style = "heigth:100px; width: 200px" alt="${personaje.name}">
        <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            <p class = "card-text"> ${personaje.occupation}</p>
            <p class = "card-text ${colorStatus}">${personaje.status}</p>
            <button class = "btn btn-warning mt-2 btn-detalle" data-id = "${personaje.id}"> Ver detalle del Personaje </button>
        </div>
    </div>
    `;
  });
});

// funcion cargar personajes

document.addEventListener("DOMContentLoaded", obternerMisPersonajes);
