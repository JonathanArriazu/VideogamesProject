import juegoservicio from "../js/juegoservicio.js";
const juegoser = new juegoservicio();

buildModal();
async function buildModal() {
  const div = document.createElement("div");

  div.innerHTML = `
    <div class="modal" tabindex="-1" id="modalConfirmCreate">
     <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Juego</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="form-create">
            <input type="text" id="gameid" style="display:none"/>
            <div class="mb-3">
              <div>
                <label>Nombre Juego</label>
              </div>
              <input type="text" class="form-control " id="gameNombre" maxlength="10" value="" required>
              <div class="invalid-feedback">
                Ingrese el nombre del juego
              </div>
            </div>
            <div class="mb-3">
              <div>
                <label>Descripcion Juego</label>
              </div>
              <textarea id="gameDescription" value="" class="form-control "  rows="3"></textarea>
              <div class="invalid-feedback">
                Ingrese la descripción del juego
              </div>
            </div> 
            <div class="mb-3">
              <div>
                <label>Descripcion Juego destacado</label>
              </div>
              <textarea class="form-control" value="" id="gameDescriptionShort" maxlength="130" rows="3"></textarea>
              <div class="invalid-feedback">
                Ingrese la descripción del juego
              </div>
            </div> 
            <div class="mb-3">
              <label>Destacado?</label>
              <select name="gamedest" value="" id="gamedescatado" class="">
                <option value='true'>Sí</option>
                <option value='false'>No</option>
              </select>
              <div class="invalid-feedback">
                Seleccione si el juego debería ser destacado o no
              </div>
            </div>
            <div class="mb-3">
              <div>
                <label>Imagen Juego</label>
              </div>
              <input type="text" value="" id="gameimg" style="width:270px;height:30px" class=""/>
              <div class="invalid-feedback">
                Seleccione una imágen para el juego
              </div>
            </div>
            <div class="mb-3">
              <div>
                <label>Imagen Juego Destacado</label>
              </div>
              <input type="text" value="" id="gameimgdest" style="width:270px;height:30px" class=""/>
              <div class="invalid-feedback">
              Seleccione una imágen para el juego destacado
              </div>
            </div>
            <div class="mb-3">
              <label>Elegir categoria</label>
              <select class="form-select" id="myselect" aria-label="gamecategoria" class="">
                <option value="Deporte">Deporte</option>
                <option value="Shooters">Shooters</option>
                <option value="Aventura">Aventura</option>
                <option value="Accion">Accion</option>
              </select>
              <div class="invalid-feedback">
              Seleccione una categorías
              </div>
            </div>
            <div id="error-alert" class="alert alert-danger" style="visibility: hidden;" role="alert">
              Todos los campos son requeridos
            </div>
          </form>
        </div>         
        <div class="modal-footer">
          <button type="button" id="cerrarmodal" class="btn btn-secondary btnclose" data-bs-dismiss="modal">Cerrar</button>
          <button type="submit" class="btn btn-primary btnsavegame">Guardar</button>     
        </div>
      </div>
    </div>
  </div>
  `;

  document.body.append(div);

  addListeners();

  function addListeners() {
    document.addEventListener("DOMContentLoaded", async function (e) {
      const games = await juegoser.getGames();
      await juegoser.buildGameDOM(games);
    });

    document.addEventListener("click", async function (e) {
      let id = 0;
      if (document.querySelector("#gameid").value) {
        id = document.querySelector("#gameid").value;
      }
      const game = {
        id: id,
        name: document.querySelector("#gameNombre").value,
        description: document.querySelector("#gameDescription").value,
        shortdescription: document.querySelector("#gameDescriptionShort").value,
        img: document.querySelector("#gameimg").value,
        imgdest: document.querySelector("#gameimgdest").value,
        category: document.getElementById("myselect").value,
        isDestacado: document.querySelector("#gamedescatado").value,
      };

      if (e.target.classList.contains("btnclose")) {
        clearFields(game);
      }

      if (e.target.classList.contains("btnsavegame")) {
        console.log("game: ", game);

        const isValid = isGameDataValid(game);

        if (isValid) {
          if (document.querySelector("#gameid").value) {
            juegoser.editGame(game);
          } else {
            juegoser.crearGame(game);
          }
          clearFields(game);
        } else {
          console.log("INVALID DATA");
          highlightMissingFields(game);
        }
      } else if (e.target.classList.contains("btnDeleteGame")) {
        juegoser.deletegame(e.target.parentElement.id);
      } else if (e.target.classList.contains("btnEditGame")) {
        const gameedit = await juegoser.getGame(e.target.parentElement.id);
        await setgameedit(gameedit);
      } else if (e.target.classList.contains("btn-nuevo-game")) {
        document.querySelector("#form-create").reset();
      }
    });
  }

  function isGameDataValid(game) {
    let isValid = false;
    const {
      name,
      description,
      shortdescription,
      img,
      imgdest,
      category,
      isDestacado,
    } = game;

    if (
      name &&
      description &&
      shortdescription &&
      img &&
      imgdest &&
      category &&
      isDestacado
    ) {
      isValid = true;
    }
    return isValid;
  }

  function highlightMissingFields(game) {
    const className = "is-invalid";

    const name = document.querySelector("#gameNombre");
    const description = document.querySelector("#gameDescription");
    const shortdescription = document.querySelector("#gameDescriptionShort");
    const img = document.querySelector("#gameimg");
    const imgdest = document.querySelector("#gameimgdest");
    const category = document.getElementById("myselect");
    const isDestacado = document.querySelector("#gamedescatado");

    if (!game.name) {
      name.classList.add(className);
    }
    if (!game.description) {
      description.classList.add(className);
    }
    if (!game.shortdescription) {
      shortdescription.classList.add(className);
    }
    if (!game.img) {
      img.classList.add(className);
    }
    if (!game.imgdest) {
      imgdest.classList.add(className);
    }
    if (!game.category) {
      category.classList.add(className);
    }
    if (!game.isDestacado) {
      isDestacado.classList.add(className);
    }

    const errorAlert = document.querySelector("#error-alert");
    errorAlert.style.visibility = "visible";
  }

  function isGameDataValid(game) {
    let isValid = false;
    const {
      name,
      description,
      shortdescription,
      img,
      imgdest,
      category,
      isDestacado,
    } = game;

    if (
      name &&
      description &&
      shortdescription &&
      img &&
      imgdest &&
      category &&
      isDestacado
    ) {
      isValid = true;
    }
    return isValid;
  }

  function clearFields(game) {
    const className = "is-invalid";

    const name = document.querySelector("#gameNombre");
    const description = document.querySelector("#gameDescription");
    const shortdescription = document.querySelector("#gameDescriptionShort");
    const img = document.querySelector("#gameimg");
    const imgdest = document.querySelector("#gameimgdest");
    const category = document.getElementById("myselect");
    const isDestacado = document.querySelector("#gamedescatado");

    name.classList.remove(className);
    description.classList.remove(className);
    shortdescription.classList.remove(className);
    img.classList.remove(className);
    imgdest.classList.remove(className);
    category.classList.remove(className);
    isDestacado.classList.remove(className);

    const errorAlert = document.querySelector("#error-alert");
    errorAlert.style.visibility = "hidden";
  }

  async function setgameedit(gameedit) {
    const gameNombre = document.querySelector("#gameNombre");
    const gameDescription = document.querySelector("#gameDescription");
    const gameDescriptionShort = document.querySelector(
      "#gameDescriptionShort"
    );

    const gameimg = document.querySelector("#gameimg");
    const gamecategoria = document.querySelector("#myselect");
    const gameid = document.querySelector("#gameid");
    const gamedest = document.querySelector("#gamedescatado");
    const gameimgdest = document.querySelector("#gameimgdest");

    gameNombre.value = gameedit.name;
    gameDescription.value = gameedit.description;
    gameimg.value = gameedit.img;
    gamecategoria.value = gameedit.category;
    gameimgdest.value = gameedit.imgdest;
    gamedest.value = gameedit.isDestacado;
    gameDescriptionShort.value = gameedit.shortdescription;
    if (gameedit.id) {
      gameid.value = gameedit.id;
    } else {
      gameid.value = 0;
    }
  }
}
