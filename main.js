// import data from "./data.js";

const { events } = data;
const d = document;
const main = d.getElementById("main");

// Fuuncionalidad de Pintar Cards en el DOM
const pintarCard = (data) => {
  const ul = d.querySelector(".container-card");
  const template = d.querySelector(".template").content;
  const fragment = d.createDocumentFragment();

  data.map((el) => {
    const clone = template.firstElementChild.cloneNode(true);
    clone.classList.add(el.category);
    clone.querySelector("img").setAttribute("src", el.image);
    clone.querySelector("h2").textContent = el.name;
    clone.querySelector("p").textContent = el.description;
    clone.querySelector(".precio").textContent = `Precio: ${el.price}`;
    clone.querySelector(".btn-card").setAttribute("data-category", el._id);
    fragment.appendChild(clone);
    ul.appendChild(fragment);
  });
};

// Funcionalidad de FILTRO Por CATEGORIAS
const botones = d.querySelectorAll(".btn");
console.log(botones);
let filtrado = false;

botones.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target.matches(".btn") || e.target.matches(".btn *")) {
      const li = d.querySelectorAll(".card");
      const lista = [...li];
      const filtro = "filter";
      const filterCategory = () => {
        if (e.target.dataset.category) {
          let cine = lista.filter(
            (el) => !el.classList.contains(e.target.dataset.category)
          );
          console.log(cine);
          cine.forEach((el) => el.classList.add(filtro));
        }
        filtrado = true;
      };
      const resetCategory = () => {
        lista.forEach((el) => {
          el.classList.remove(filtro);
        });
        filterCategory();
      };

      filtrado ? resetCategory() : filterCategory();
    }
  });
});

// funcionalidad de filtro por busqueda
const input = d.querySelector(".buscador");
const cards = d.querySelectorAll(".card");

input.addEventListener("keyup", (e) => {
  if (e.target.matches(".buscador")) {
    const cards = d.querySelectorAll(".card");
    cards.forEach((el) =>
      el.textContent.toLocaleLowerCase().includes(e.target.value)
        ? el.classList.remove("filter")
        : el.classList.add("filter")
    );
  }
});
window.addEventListener("DOMContentLoaded", pintarCard(events));

// funcionalidad de pintar detalles de las Cards
const pintarDetallesCard = (e) => {
  const templateDetalle = d.getElementById("template-modal").content;
  const fragmentDetalle = d.createDocumentFragment();
  const containerModal = d.getElementById("modal");
  const clone = templateDetalle.firstElementChild.cloneNode(true);
  const btnCerrar = clone.querySelector(".btn-cerrar");
  console.log(e.target.dataset.category);

  let objDetalle = events.find((el) => el._id == e.target.dataset.category);
  console.log(objDetalle);
  console.log(clone.querySelector("h2"));
  clone.querySelector("img").setAttribute("src", objDetalle.image);
  clone.querySelector("img").setAttribute("alt", objDetalle.name);
  clone.querySelector("h2").textContent = objDetalle.name;
  clone.querySelector("p").textContent = objDetalle.description;

  fragmentDetalle.appendChild(clone);
  containerModal.appendChild(fragmentDetalle);

  containerModal.classList.add("modal-container");

  btnCerrar.addEventListener("click", (e) => {
    const element = d.querySelector(".container-detalle");
    containerModal.removeChild(element);
    containerModal.classList.remove("modal-container");
  });
};
const btnDetalle = d.querySelectorAll(".btn-card");
console.log(btnDetalle);
btnDetalle.forEach((el) => {
  el.addEventListener("click", pintarDetallesCard);
});
