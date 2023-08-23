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
      return id;
    } catch (error) {
      console.log("No se ha podido agregar el producto", error);
    }
  }

  async getCartById(id) {
    const cartArray = await this.getAll();
    const cart = cartArray.find((cartx) => cartx.id === id);
    if (cart) {
      console.log(cart);
      return cart.products;
    } else {
      return console.log("El carrito no existe");
    }
  }

  async addProductToCart(cid, pid) {
    let cart = await this.getCartById(cid);
    console.log(cart);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    } else {
      cart.products.push(pid);
      console.log(cart);
      return cart;
    }
  }
}
