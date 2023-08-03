export default class Product {
  //static #count = 1;//

  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.increaseId();

  }

 // Metodo de clase //
  static increaseId() {
    //si existe esta propiedad en el objeto creado, la aumento en 1 
    if (this.idIncrement) {
      this.idIncrement++
    } else {
      // si no existe, la inicializo en 1
      this.idIncrement = 1
    }
    return this.idIncrement
  }

}

// const prod1 = new Product("Remera", "remera de algodon", 1500, "picture", "AAR56", 50);
// const prod2 = new Product("Remera", "remera de algodon", 120, "picture", "AAR576", 50);
// console.log(prod1);
// console.log(prod2); 