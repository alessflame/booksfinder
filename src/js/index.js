import Append from "./Append.js";

//  import "../img/1_20220216_094041_0000.png";
//  import "../img/2_20220216_094041_0001.png";
//  import "../img/5_20220216_094041_0004.png";
import myIcon1 from "../img/a-book-gd85fbcc77_640.png";
import myIcon2 from "../img/survey-gbb6c027e1_640.png";
import "../css/index.css";
import "../css/mobile.css";
//modifica del testo nell'header

let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");

image1.src = myIcon1;
image2.src = myIcon2;

let h2 = document.getElementById("wordsChange");
let title = document.querySelector("#boxWrite > h1");

setTimeout(() => {
  h2.innerHTML = "Esplora i tuoi interessi";
  title.classList.toggle("scala");
}, 1500);

//lista libri preferiti

let myStarsBook = document.getElementById("myStarsBook");
let bookStarsList = document.getElementById("bookStarsList");
let list = document.getElementById("listStars");

myStarsBook.onclick = () => {
  bookStarsList.classList.toggle("visible");
  bookStarsList.classList.toggle("notvisible");

  if (bookStarsList.getAttribute("class") == "visible") {
    let buttonFile = document.getElementById("buttonFile");

    buttonFile.onclick = scaricaLista();
  }
};

//creare un file txt e scaricarlo-> Lista dei libri inseriti nei preferiti

function scaricaLista() {
  let listValues = document.querySelectorAll("#listStars li");

  let file = "data:text/plain;charset=utf-8,Libri da leggere:";

  for (let i = 0; i < listValues.length; i++) {
    file += `\r \n -   ${listValues[i].textContent}    -`;

    let buttonFile = document.getElementById("buttonFile");

    buttonFile.setAttribute("href", file);

    buttonFile.download = "listaLibri.txt";
  }
}

//animazioni
let info = document.querySelectorAll(".infoCard");
let categorie = document.getElementById("categoriesList");
window.onscroll = () => {
  animazione(info[0]);
  animazione(info[1]);

  animazione(categorie);
};

function animazione(element) {
  if (window.pageYOffset >= element.offsetTop - element.clientHeight * 3) {
    element.style.opacity = "1";
  }
}

let sezioneLibri = document.getElementById("booksList");
let categories;
let button = document.getElementById("button");
let libro = document.getElementById("bookDescription");
let cardCategory = document.querySelector("#categoriesList");
let source;

//click alle categorie di esempio: il testo compare nell'input di ricerca

cardCategory.onclick = (e) => {
  if (e.target.tagName == "A")
    document.getElementById("ricerca").value = e.target.innerText;
};

// recuperare tutti i libri
async function getAllBooks() {
  categories = document.getElementById("ricerca").value;
  sezioneLibri.innerHTML = `<span id="progressBar"></span>`; //progressBar grafica viene inserita

  try {
    if (categories) {
      await new Append().innerList(categories, sezioneLibri);
    } else {
      sezioneLibri.innerHTML = "inserisci una categoria";
    }

    //viene chiamato il metodo innerList che appende il risultato della ricerca in un tag specifico, in
    //questo caso il div id="sezioneLibri";
  } catch (err) {
    sezioneLibri.innerHTML = "Qualcosa &egrave andato storto";
  }
}

//visualizzare un libro specifico e la sua descrizione
async function readBook(e) {
  if (e.target.tagName == "A") {
    let key = e.target.getAttribute("key");

    try {
      let response = await new Append().innerBook(key, libro);

      let addStars = document.getElementById("myBook");
      addStars.onclick = () => {
        starsBook(response.title, response.image);
      };
    } catch (err) {
      libro.innerHTML = "Impossibile eseguire il caricamento.";
      console.log(err);
    }
  }
}

//al click si avvia la ricerca: si connette alle API di OpenLibrary
button.addEventListener("click", getAllBooks);
sezioneLibri.addEventListener("click", (e) => {
  readBook(e);
});

//aggiungere un libro tra i preferiti

let favouriteBooks = new Array();
let imageBooks = new Array();
let booksNumber = document.getElementById("booksNumber");
let listStars = document.getElementById("listStars");

// function returnString(value){
//     return ' ' + value.replace(/'/, '  ')+' ';
// }

//funzione che controlla se un libro è già stato aggiunto ai preferiti poi
//aggiunge il titolo di un libro e la relativa cover in due array diversi
function starsBook(book, source) {
  if (favouriteBooks.includes(book) == false) {
    favouriteBooks.push(book);
    imageBooks.push(source);

    addList();
  } else {
    alert("già presente nei preferiti!");
  }
}

//funzione che aggiunge il titolo e la cover di un libro ai preferiti
//appendento alla sezione "listStars"  elementi <li>
function addList() {
  listStars.innerHTML = " ";
  for (let i = 0; i < favouriteBooks.length; i++) {
    listStars.innerHTML += `<li> ${favouriteBooks[i]} <img src="${imageBooks[i]}"/> </li>`;
  }

  booksNumber.innerHTML = favouriteBooks.length;
}
