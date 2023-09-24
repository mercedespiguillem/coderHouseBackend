import { promises as fs } from "fs";
const pathcart = "./cart.json";

class Cart {
  constructor() {
    this.products = [];
    this.id = Cart.increaseId();
    this.path = pathcart;
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

  async addProduct(newProd) {
    const prodsArray = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const product = prodsArray.find((prod) => prod.id === newProd.id);
    newProd;
    if (product) {
      console.log("El producto ya existe");
    } else {
      prodsArray.push(newProd);
      await fs.writeFile(this.path, JSON.stringify(prodsArray));
    }
  }
}




export default class CartsApi {
  constructor() {
    this.carts = [];
    this.file = pathcart;
  }

  async getAllcarts() {
    try {
      let carts = await fs.promises.readFile(`${this.file}`, "utf-8");
      return JSON.parse(carts);
    } catch (err) {
      console.log(`Error al leer los productos: `, err);
      return [];
    }
  }

  async saveNewCart() {
    let cartArray = await this.getAllcarts();
    const newCart = new Cart();
    this.carts.push(newCart);
    
    try {
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(cartArray, null, 2)
      );
      return cartArray
    } catch (error) {
      console.log("No se ha podido crear el carrito", error);
    }
  }

  async getCartById(id) {
    const cartArray = await this.getAllcarts();
    const cart = cartArray.find((cartx) => cartx.id === id);
    if (cart) {
      console.log(cart);
      return cart.products;
    } else {
      console.log("El carrito no existe");
      return false 
    }
  }

  async addProductToCart(cid, pid) {
    let cart = await this.getCartById(cid);
    console.log(cart);
    const prodIndex = cart.products.findIndex(prod => prod.id === pid)

        if (prodIndex != -1) {
            cart.products[prodIndex].quantity += 1
        } else {
            cart.products.push({ id: pid, quantity: 1 })
        }

        //Guardarlo en JSON
        try {
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(cart, null, 2)
      );
      return cart
    } catch (error) {
      console.log("No se ha podido crear el carrito", error);
    }


  }
}
