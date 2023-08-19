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
      this.idIncrement++;
    } else {
      // si no existe, la inicializo en 1
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }
}
