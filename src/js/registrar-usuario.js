const myForm = document.getElementById("myForm");
const nombre = document.querySelector(".userName input");
const usuario = document.querySelector(".userUser input");
const correo = document.querySelector(".userMail input");
const password = document.querySelector(".userPassword input");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (nombre && usuario && correo && password) {
    createUser();
  } else {
    alert("Revise los datos ingresados antes de continuar");
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
