//variables
const usuarioLogin = document.querySelector(".grupo_usuarioLogin input");
const passwordLogin = document.querySelector(".grupo_passwordLogin input");
const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  const usuario = usuarioLogin.value;
  const password = passwordLogin.value;
  if (usuario && password) {
    login(usuario, password);
  } else {
    console.log("No entra");
  }
});

const login = async (usuario, password) => {
  try {
    const response = await fetch(
      `http://localhost:4000/usuario?usuario=${usuario}`
    );
    const usuarios = await response.json();

    if (usuarios.length && usuarios[0].password === password) {
      if (usuarios[0].admin) {
        console.log("Es admin");
        window.location.href = "./pruebadb.html";
      } else {
        console.log("No es admin");
        window.location.href = "./index.html";
      }
    } else {
      alert("Usuario/Contraseña Incorrecto");
    }
  } catch (error) {
    console.log(error);
  }
};

import creationOfFooter from "../ui/footer.js";
creationOfFooter();
import creationOfNavbar from "../ui/navbar.js";
creationOfNavbar();
