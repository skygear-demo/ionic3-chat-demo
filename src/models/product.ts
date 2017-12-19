export class Product {

    name:string;
    photoURL:string;
    author:string;

    constructor(arg){
      this.name = arg.name;
      this.photoURL = arg.photoURL;
      this.author = arg.author;
    }
}