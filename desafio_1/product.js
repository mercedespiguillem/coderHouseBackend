export default class Product {
  static #count = 1;

  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = Product.#count++;
    this.stock = stock;
  }
}

//const prod1 = new Product("Remera", "remera de algodon", 1500, "picture", 50);
//const prod2 = new Product("Remera", "remera de algodon", 120, "picture", 50);
//console.log(prod1);
//console.log(prod2);