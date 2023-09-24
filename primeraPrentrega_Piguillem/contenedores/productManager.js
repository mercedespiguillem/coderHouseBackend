import { isUtf8 } from "buffer";
import { promises as fs } from "fs";

const path = "./products.json";

class Product {

  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.code = code;
    this.stock = stock;
    this.thumbnail = thumbnail;
    this.id = Product.increaseId();
  }

  // Metodo de clase //
  static increaseId() {
    //si existe esta propiedad en el objeto creado, la aumento en 1
    if (this.increaseId) {
      this.increaseId++;
    } else {
      // si no existe, la inicializo en 1
      this.increaseId = 1;
    }
    return this.increaseId;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
    this.path = path;
  }

  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    console.log(products);
    return products;
  }

  async getProductById(id) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const product = products.find((prod) => prod.id === id);
    if (product) {
      console.log(product);

      return product;
    } else {
      console.log("Producto no encontrado");
    }
  }

async addProduct(newproduct) {
  //traigo el array de productos
  const prodsArray = JSON.parse(await fs.readFile(this.path, "utf-8"))

  let id = 1;
  if (prodsArray.length > 0) {
    id = prodsArray[prodsArray.length - 1].id + 1;
  }

  const newProd = { ...newproduct, id: id };
  prodsArray.push(newProd);

  try {
    await fs.writeFile(this.path, JSON.stringify(prodsArray));
    console.log(id);
    return id;
  } catch (error) {
    console.log("No se ha podido agregar el producto", error);
  }


   /* const newProduct = {...newProd};
  const produ = prodsArray.find((prod) => prod.id === newProd.id);

  if (produ) {
    console.log("El producto ya existe.");
    return false;
  } else {
    prodsArray.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(prodsArray));
    return true;
  }*/
}

  

  async updateProduct(id, product) {
    const prodsArray = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const ind = prodsArray.findIndex((prod) => prod.id === id);

    if (ind != -1) {
      prodsArray[ind].nombre = product.nombre;
      await fs.writeFile(this.path, JSON.stringify(prodsArray));
    } else {
      console.log("Producto no encontrado");
    }
  }

  async deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const product = products.find((prod) => prod.id === id);

    if (product) {
      await fs.writeFile(
        this.path,
        JSON.stringify(products.filter((prod) => prod.id != id))
      );
    } else {
      console.log("Producto no encontrado");
    }
  }
}

export default ProductManager;
