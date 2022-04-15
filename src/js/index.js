const API_URL = "http://localhost:4000/games";
const sportSection = document.querySelector(".sport-games");
const shooterSection = document.querySelector(".shooter-games");
const actionSection = document.querySelector(".action-games");
const isDestacadoSection = document.querySelector(".is-destacado");

async function getCategories() {
  try {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    sportGames(data);
    isDestacados(data);
  } catch (error) {
    console.log(error);
  }
}

getCategories();

// Functions
function sportGames(games) {
  let div;
  games.forEach((game) => {
    switch (game.category) {
      case "Deporte":
        div = getHtml(game);
        sportSection.append(div);
        break;
      case "Shooters":
        div = getHtml(game);
        shooterSection.append(div);
        break;
      case "Aventura":
        div = getHtml(game);
        actionSection.append(div);
        break;
    }
  });
}

function isDestacados(games) {
  games = games.filter(
    (game) => game.isDestacado === true || game.isDestacado === "true"
  );
  let div;
  games.forEach((game) => {
    div = getHtml(game);
    isDestacadoSection.append(div);
  });
}

function getHtml(game) {
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `<div class="card h-100 hover-overlay">
            <a class="text-decoration-none" href="../html/single-game.html#${game.id}">
            <img
              src="${game.img}"
              class="card-img-top"
              alt=""
            />
            <div class="card-body">
              <h2 class="card-title text-center product-name">${game.name}</h2>
            </div>
            </a>
          </div>`;
  return div;
}

/*
// Esta es una IIFE: Inmediatly Invoked Function Expression --> Instancia una funcion y la ejecuta al toque y no hace falta que tenga nombre porque se ejecuta en el momento. Se ejecuta una sola vez.
(async () => {
  const games = await getGames();
  sportGames(games);
})();
 */

import creationOfFooter from "../ui/footer.js";
creationOfFooter();

import creationOfNavbar from "../ui/navbar.js";
creationOfNavbar();

import creationfOfHero from "./hero.js";
creationfOfHero();
