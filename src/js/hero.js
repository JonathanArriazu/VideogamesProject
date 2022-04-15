export function creationfOfHero() {
  const API_URL = "http://localhost:4000/games";
  const heroSection = document.querySelector(".featuredGames-corousel");

  async function getFeaturedGames() {
    try {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      isDestacados(data);
    } catch (error) {
      console.log(error);
    }
  }

  getFeaturedGames();

  function isDestacados(games) {
    games = games.filter(
      (game) => game.isDestacado === true || game.isDestacado === "true"
    );
    let div;
    games.forEach((game, index) => {
      div = getHtml(game, index);
      heroSection.append(div);
    });
  }

  function getHtml(game, index) {
    const div = document.createElement("div");
    div.classList.add("carousel-item");
    if (index === 0) {
      div.classList.add("active");
    }
    div.innerHTML = `
                <img
                  src="${game.imgdest}"
                  class="w-100"
                />
              <div class="carousel-caption">
                <h5>${game.name}</h5>
                <p>${game.shortdescription}</p>
                <a href="index.html" class="btn1">Jugar</a>
`;
    return div;
  }
}

export default creationfOfHero;
