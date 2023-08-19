import { promises as fs } from "fs";

const pathcart = "/cart.json";

class cartManager {
  constructor() {
    this.products = [];
    this.path = pathcart;
  }

  async createCart() {
    //debo crear un cart.js que funcione como un constructor en el cual el id se autogenere?

  }

  async getCart() {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    console.log(products);
    return products;
  }

  async getCart(cid) {
    const cartArray = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const cartX = cartArray.find((cart) => cart.id === cid);
    if (cartX) {
      console.log(cartX);

      return cartX;
    } else {
      console.log("El carrito no existe");
    }

  }


  
}
