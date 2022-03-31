const API_URL =  "http://localhost:3000/";
const gamesListContainer = document.querySelector("#gamesListContainer");
const getGamesButton = document.querySelector("#get-games-btn");



function buildGameDOM(games) {
    const gameList = [];
    games.forEach((game) => {
      const section = document.createElement("section");
      section.innerHTML = `
      <div id="${game.id}>
        <a href="detail.html#${game.id}"> </a>
        <p> ${game.name} </p>
        <img src="${game.img}">
          <p> ${game.description}</p>
          <button type="button" class="playButton">Play Now!</button>
          <button type="button" class="deleteButton">X</button>
          <button type="button" class="editButton">Editar</button>
      </div>
      `;
      gameList.push(section);
    });
    gamesListContainer.append(...gameList);
  }
  
  const getGames = async () => {
    try {
      const response = await fetch(`${API_URL}games`);
      const data = await response.json();
      buildGameDOM(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  addListeners();
  function addListeners() {
    getGamesButton.addEventListener("click", getGames);
  }