


export default class BookApi{
      

    async getAllBooks(param){
      let request = await fetch(`https://openlibrary.org/subjects/${param}.json`);
      let response = await request.json();

      return response;
    }

    async getBook(param){
      let request = await fetch(`https://openlibrary.org${param}.json`);
      let response = await request.json();
    
      return response;

    }

    async getImage(param, size){
      let request = await fetch(`https://covers.openlibrary.org/b/id/${param}-${size}.jpg`);
      let blob = await request.blob();

      return blob;
    }


  }





