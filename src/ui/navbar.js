export function creationOfNavbar() {
  // LOGO NAVBAR

  const navLogo = document.querySelector(".nav-logo-container");

  function logo_fun(imagen) {
    let logo = document.createElement("a");
    logo.classList.add("navbar-brand");
    logo.innerHTML = `
  <a href="../html/index.html">
    <img src="${imagen}" width="135" height="50"/>
  </a>
  `;
    return logo;
  }

  // Fetch function

  fetch("http://localhost:4000/navbarImage")
    .then((resp) => resp.json())
    .then((json) => {
      json.map((data) => {
        console.log(data.img);
        navLogo.append(logo_fun(data.img));
      });
    });

  //

  // HAMBURGER MENU BUTTON

  const hamburgerMenu = document.querySelector(".hamburger-menu");

  hamburgerMenu.innerHTML = `
  <button class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
     data-bs-target="#navbarNav"
     aria-controls="navbarNav"
     aria-expanded="false"
     aria-label="Toggle navigation"
  >
  <span></span>
  <span></span>
  <span></span>
`;
  hamburgerMenu.append();

  // NAVBAR ITEMS

  const navItems = document.querySelector(".items-navbar");

  let items = document.createElement("ul");
  items.classList.add(
    "navbar-nav",
    "text-center",
    "ms-auto",
    "mb-2",
    "mb-lg-0"
  );
  items.innerHTML = `
<li class="nav-item">
  <a class="nav-link" href="#">Sobre nosotros</a>
</li>
<li class="nav-item">
  <a class="nav-link" href="#">Contacto</a>
</li>
<li class="nav-item login-class">
  <a class="nav-link" href="#">Iniciar sesión</a>
</li>
<li class="nav-item register-class">
  <a data-bs-toggle="modal" data-bs-target="#modal_sub" class="btn btn-primary sign-up-btn" href="">Registrarse</a>
</li>
<li class="nav-item">
  <a class="nav-link user" href="#"></a>
</li>
`;
  navItems.append(items);

  // User Conected
  const userContainer = document.querySelector(".user");
  const parent = document
    .getElementById("main-nav")
    .getElementsByTagName("ul")[0];
  const child = parent.getElementsByTagName("li")[3];
  const child2 = parent.getElementsByTagName("li")[2];

  localStorage.setItem(
    "loggedUser",
    JSON.stringify({ name: "Jonathan", lastname: "Arriazu", admin: true })
  );

  async function getUser() {
    try {
      const response = await fetch("http://localhost:4000/games");
      const data = await response.json();
      console.log(data)
   } catch (error) {
     console.log(error);
   }
  }
  getUser();

  document.addEventListener("DOMContentLoaded", createHeader());

  function createHeader() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser.admin === true) {
      parent.removeChild(child);
      parent.removeChild(child2);
      //userContainer.textContent = `Bienvenido ${loggedUser.name}`;
      const userMenu = document.createElement("div");
      userMenu.classList.add("dropdown");
      userMenu.innerHTML = `
    <p class="dropdown-toggle logged-user" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
    Bienvenido ${loggedUser.name}
    </p>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="../html/pruebadb.html">Panel de administrador</a></li>
    <li><a class="dropdown-item" href="#">Perfil de usuario</a></li>
    <li><a class="dropdown-item" href="#">Logout</a></li>
    </ul>
    `;
      userContainer.append(userMenu);
    } else if (loggedUser.admin === false) {
      parent.removeChild(child);
      parent.removeChild(child2);
      //userContainer.textContent = `Bienvenido ${loggedUser.name}`;
      const userMenu = document.createElement("div");
      userMenu.classList.add("dropdown");
      userMenu.innerHTML = `
    <p class="dropdown-toggle logged-user" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
    Bienvenido ${loggedUser.name}
    </p>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#">Perfil de usuario</a></li>
    <li><a class="dropdown-item" href="#">Logout</a></li>
    </ul>
    `;
      userContainer.append(userMenu);
    }
    else {
      parent.appendChil(removed);
      parent.appendChil(removed2);
    }
  }
}

export default creationOfNavbar;
