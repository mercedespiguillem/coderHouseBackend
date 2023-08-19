import { promises as fs } from "fs";

const path = "./products.json";

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

  async addProduct(newProd) {
    const prodsArray = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const produ = prodsArray.find((prod) => prod.id === newProd.id);
    newProd;
    if (produ) {
      console.log("El producto ya existe");
    } else {
      prodsArray.push(newProd);
      await fs.writeFile(this.path, JSON.stringify(prodsArray));
    }
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
