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
const modalBody = document.querySelector("#modal-body");

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
    const respuesta = await fetch(URLDetalles + id);
    const detalle = await respuesta.json();
    modalBody.innerHTML = `
    <img src = "${URlImagenes}${detalle.portrait_path}"class = "img-fluid" alt = "${detalle.name}">
    <h3>${detalle.name}</h3>
    <p><i class = "bi bi-calendar"></i> <strong> Edad:</strong> ${detalle.age || "sin datos"}</p>
    <p><i class = "bi bi-cake"></i><strong> Nacimiento:</strong>${detalle.birthdate || "sin datos"}</p>
    <p><i class="bi bi-gender-ambiguous"></i> <strong>Género:</strong> ${detalle.gender || "sin datos"}</p>
     <p><i class="bi bi-briefcase"></i> <strong>Ocupación:</strong> ${detalle.occupation || "sin datos"}</p>
     <p><i class="bi bi-heart"></i> <strong>Estado:</strong> ${detalle.status || "sin datos"}</p>
     <p><i class="bi bi-chat-quote"></i> <strong>Frase:</strong> ${detalle.phrases ? detalle.phrases[0] : "sin frase"}</p
    `;
    document.querySelector("#exampleModalLabel").textContent = detalle.name;
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
