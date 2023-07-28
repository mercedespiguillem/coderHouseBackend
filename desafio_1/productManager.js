class ProductManager {
  constructor() {
    this.products = [];
  }

  //metodo para validar Id
  #validateId(id) {
    const product = this.products.filter((product) => product.code == id);
    if (product != '') {
      return console.log("This Id already exist");
    } else {
      return false;
    }
  }

  //metodo addProduct - agrega un producto al array

  addProduct(product) {
    if (!this.#validateId(product.code)) {
      return this.products.push(product);
    }
  }

  // metodo getProducts
  getProducts() {
    return this.products;
  }

  // metodo getProductbyId
  getProductById(id) {
    const product = this.products.filter((product) => product.code == id);
    if (product != "") {
      return product;
    } else {
      throw new Error("Not found");
    }
  }
}

export default ProductManager;
