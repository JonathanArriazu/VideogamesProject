const API_URL = "http://localhost:4000";
const gamesListContainer = document.querySelector("#gamesListContainer");
const btnSave = document.querySelector("#btnSave");

class juegoservicio {
  //mostrar el dom
  async buildGameDOM(games) {
    const gameList = [];
    games.forEach((game) => {
      const section = document.createElement("section");
      section.innerHTML = `
     

 
     <table class="table table-primary table-hover" id="tablagame">
  
     
     <tbody>
       <tr>
     
         <td>${game.name}</td>
         <td>${game.description}</td>
         <td>
         <img src="${game.img}">
         </td>
         <td>${game.category}</td>
         <td>
         <div id="${game.id}">
     <button type="button" class="btnDeleteGame">X</button>
     <button type="button" class="btnEditGame" data-bs-toggle="modal" data-bs-target="#modalConfirmCreate">Editar</button>         </td>
     </div>
         </td>
         <td>
       </tr>
       
     </tbody>
    

   `;
      gameList.push(section);
    });
    gamesListContainer.append(...gameList);
  }

  //funcion para crear juego
  crearGame(game) {
    try {
      fetch(`${API_URL}/games`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: game.name,
          description: game.description,
          img: game.img,
          category: game.category,
          id: game.id,
          isDestacado:game.isDestacado,
          shortdescription:game.shortdescription,
          imgdest: game.imgdest
        
        }),
      });
    } catch (error) {
      throw error;
    }
  }

  //Funcion para eliminar juegos de db.json
  async deletegame(gameid) {
    try {
      await fetch(`${API_URL}/games/${gameid}`, { method: "DELETE" });
    } catch (error) {
      throw error;
    }
  }
  //Funcion para trarer un game de la db.json
  async getGame(gameId) {
    try {
      const response = await fetch(`${API_URL}/games/${gameId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  //funcion para traer los juegos
  async getGames() {
    try {
      const response = await fetch(`${API_URL}/games`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async editGame(game) {
    try {
      await fetch(`${API_URL}/games/${game.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: game.name,
          description: game.description,
          img: game.img,
          category: game.category,
          isDestacado: game.isDestacado,
          shortdescription: game.shortdescription,
          imgdest:game.imgdest
        }),
      });
    } catch (error) {
      throw error;
    }
  }
}

export default juegoservicio;
