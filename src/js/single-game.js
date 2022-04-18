const API_URL = "http://localhost:4000/games";
const gameId = window.location.hash.slice(1);
const gameContainer = document.querySelector(".gameContainer");
const comments_API = "https://jsonplaceholder.typicode.com/comments";
const commentsContainer = document.querySelector(".div-comments");
const commentsForm = document.querySelector("#formulario");
const commentText = document.querySelector("#comment");
const userMail = document.querySelector("#user-email");
const userComments = document.querySelector("#lista-comments");

let userCommentsList = [];

loadListener();

function loadListener() {
  commentsForm.addEventListener("submit", emailValidation);
  commentsForm.addEventListener("submit", commentsValidation);
}
//INFO GAME

async function getGamesInfo(gameId) {
  try {
    const response = await fetch(`${API_URL}/${gameId}`);
    const data = await response.json();
    gameContainerHtml(data);
  } catch (error) {
    console.log(error);
  }
}

function gameContainerHtml(game) {
  const div = document.createElement("div");
  div.classList.add("row", "mt-5", "justify-content-around");
  div.innerHTML = `
  <div class="d-flex justify-content-center col-lg-5 col-md-12 col-12 mb-5 imgDiv">
     <img
       class="img-fluid w-50 pb-2"
       src="${game.img}"
        id="MainImg"
       alt=""
     />
   </div>
   <div class="col-lg-6 col-md-12 col-12">
     <h2 class="d-flex justify-content-center pt-0">${game.name}</h2>
       <h5 class="d-flex justify-content-center mb-5">Juego de ${game.category}</h5>
          <span> <p class="mb-5 pb-4">${game.description} </p></span>
    <div class="d-flex justify-content-center mt-3 mb-5">
     <button type="button" class="btn btn-success fw-bold btn-play">
       <a href="404.html">Jugar Ahora</a>
     </button>
    </div>
  </div>
    `;
  gameContainer.append(div);
}

// COMMENTS

async function getComments() {
  try {
    const response = await fetch(comments_API);
    const data = await response.json();
    commentsList(data);
  } catch (error) {
    console.log(error);
  }
}

function commentsList(comments) {
  comments = comments.filter((e, i) => i < 10);
  let div;
  comments.forEach((comment) => {
    div = commentContainerHtml(comment);
    commentsContainer.append(div);
  });
}

function commentContainerHtml(comment) {
  const div = document.createElement("div");
  div.classList.add("container", "comments-container");
  div.innerHTML = `<div class="d-flex justify-content-start align-items-center gap-4">
          <h5 class="text-center mt-2">${comment.email}</h5>
        </div>
        <div class="mt-2 mb-5 opinion">
          <p class="py-4 mx-5">${comment.body}</p>
        </div>`;
  return div;
}

// Error
function errorPage() {
  const div = document.createElement("div");
  div.innerHTML = `
  <iframe src="404-single.html" allowTransparency="true" scrolling="no" frameborder="0" >
    </iframe>
  `;
  gameContainer.append(div);
}

function commentsValidation(e) {
  if (commentText.value === "") {
    const paragraph = document.createElement("p");
    const errorMessage = "No se puede ingresar un comentario vacío";
    paragraph.textContent = errorMessage;
    paragraph.classList.add("comment-error");
    commentsForm.append(paragraph);
    setTimeout(() => {
      paragraph.remove();
    }, 4000);
    return;
  } else if (commentText.value.length > 140) {
    const paragraph = document.createElement("p");
    const errorMessage =
      "No se puede ingresar un texto que supere los 140 caracteres";
    paragraph.textContent = errorMessage;
    paragraph.classList.add("comment-error");
    commentsForm.append(paragraph);
    setTimeout(() => {
      paragraph.remove();
    }, 4000);
    return;
  }
  if (commentsForm.lastElementChild.classList.contains("comment-error")) {
    commentsForm.removeChild(commentsForm.lastElementChild);
  }
  readCommets();
  userCommentsHTML();
  commentsForm.reset();
}

function emailValidation(e) {
  if (userMail.value === "") {
    const paragraph = document.createElement("p");
    const errorMessage = "No se puede ingresar un email vacío";
    paragraph.textContent = errorMessage;
    paragraph.classList.add("comment-error");
    commentsForm.append(paragraph);
    setTimeout(() => {
      paragraph.remove();
    }, 4000);
    return;
  }
  if (commentsForm.lastElementChild.classList.contains("comment-error")) {
    commentsForm.removeChild(commentsForm.lastElementChild);
  }
  readCommets();
  userCommentsHTML();
  commentsForm.reset();
}

function readCommets() {
  const comments = {
    email: userMail.value,
    text: commentText.value,
    id: Date.now().toString(),
  };
  userCommentsList.push(comments);
}

function userCommentsHTML() {
  emptyCommets();
  userCommentsList.forEach((comment) => {
    const commentContainer = document.createElement("div");
    commentContainer.innerHTML = `
    <p> ${comment.email}</p>
    <p> ${comment.text}</p>
    `;
    storageSynchronize();
    userComments.append(commentContainer);
  });
}

function storageSynchronize() {
  localStorage.setItem("comments", JSON.stringify(userCommentsList));
}

function emptyCommets() {
  while (userComments.firstChild) {
    userComments.removeChild(userComments.firstChild);
  }
}

if (gameId) {
  getGamesInfo(gameId);
  getComments();
} else {
  errorPage();
}

import creationOfFooter from "../ui/footer.js";
creationOfFooter();
import creationOfNavbar from "../ui/navbar.js";
creationOfNavbar();
