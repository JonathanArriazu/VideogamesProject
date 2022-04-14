const API_URL = "http://localhost:4000";
async function getData() {
  try {
  const response = await fetch(`${API_URL}/games/1`);
  const data = await response.json();
  return data;
  }
  catch (error){
    console.log(error)
  }
}
const data = getData()
.then ((response)=> { 
  const titulo = response.name;
  const categoria = response.category;
  const imagenURL = response.img;
  const descripcion = response.description;
  const tituloHTML = document.querySelector(".titulo");
  tituloHTML.innerHTML = titulo;
  const categoriaHTML = document.querySelector(".categoria");
  categoriaHTML.innerHTML = categoria;
  const portadaHTML = document.querySelector(".infoImage");
  const imagenHTML = document.createElement("img");
  imagenHTML.src = imagenURL;
  portadaHTML.appendChild(imagenHTML);
  const descripcionHTML = document.querySelector(".description");
  descripcionHTML.firstElementChild.innerHTML = descripcion;
})

.catch((error) => console.log(error));

