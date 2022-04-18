const inputs = document.querySelectorAll(".form_register input");
const btnFormRegister = document.querySelector(".form_register button");
const myForm = document.getElementById("myForm");
const nombre = document.querySelector(".grupo_nombre input");
const usuario = document.querySelector(".grupo_usuario input");
const correo = document.querySelector(".grupo_correo input");
const password = document.querySelector(".grupo_password input");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (nombre && usuario && correo && password) {
    createUser();
  } else {
    console.log("No entra");
  }
});

const createUser = async () => {
  try {
    await fetch("http://localhost:4000/usuario", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
        usuario: usuario.value,
        correo: correo.value,
        password: password.value,
        admin: false,
      }),
    });
    myForm.reset();
  } catch (error) {
    console.log(error);
  }
};

import creationOfFooter from "../ui/footer.js";
creationOfFooter();
import creationOfNavbar from "../ui/navbar.js";
creationOfNavbar();
