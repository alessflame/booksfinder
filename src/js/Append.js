import BookApi from "./BookApi.js";

export default class Append {
  constructor() {
    this.access = new BookApi();
  }

  async innerList(category, sezione) {
    let oggetto = await this.access.getAllBooks(category);
    //       recupero i libri per categoria

    sezione.innerHTML = " ";
    for (let i = 0; i < oggetto.works.length; i++) {
      sezione.innerHTML += `<br><li id="element${i}"><b class="titoli">
            ${oggetto.works[i].title} </b></li> `;

      let element = document.getElementById(`element${i}`);
      await this.innerImage(oggetto.works[i].cover_id, "M", element);
      //           chiama internamente innerImage appendo ogni specifica immagine ad ogni element generati

      element.innerHTML += `<a class='button' href="#bookDescription" key="${oggetto.works[i].key}" >esplora </a>`;
    }

    //non ritorna nulla;
  }

  async innerBook(book, sezione) {
    let oggetto = await this.access.getBook(book); //recupero uno specifico libro

    sezione.innerHTML = `<div id="choiseBook"> <span id="choiseSpan"><h2 id="title">${
      oggetto.title
    }</h2>
     </span> 
     <span id="spanImage"> 
     <section id="description">${
       oggetto.description
         ? oggetto.description["value"] || oggetto.description
         : "nessuna descrizione"
     } 
     </section></span><b class="button" id="myBook">aggiungi ai preferiti &#10026; </b></div> `;

    let element = document.getElementById("spanImage");
    let src = await this.innerImage(oggetto.covers[0], "M", element);
    //      chiama internamente innerImage-> appendo l'immagine a spanImage

    let obj = { title: oggetto.title, image: src };
    return obj;
    //   ritorna un oggetto con title e src perchè servono queste informazioni per richiamare
    //   il task dell'aggiunta ai preferiti
  }

  async innerImage(param, size, element) {
    let blob = await this.access.getImage(param, size); //chiede l'immagine
    let img = document.createElement("img");

    element.appendChild(img);
    //    crea un tag img e lo appende all'elemento HTML inserito come parametro
    img.src = URL.createObjectURL(blob);
    //    crea un url e lo inserisce come src

    return img.src; //ritorna la src della foto
  }
}
