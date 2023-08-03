class ProductManager {
  constructor() {
    this.products = [];
  }

  // //metodo para validar Id
  // #validateId(id) {
  //   const product = this.products.filter((product) => product.code == id);
  //   if (product != '') {
  //     return console.log("This Id already exist");
  //   } else {
  //     return false;
  //   }
  // }

  //metodo addProduct - agrega un producto al array

  addProduct(product) {
    const prod = this.products.find(prod => prod.code === product.code) 
    if(prod) {
      console.log("producto encontrado")
    }  else { 
    this.products.push(product);
    }
  }

  // metodo getProducts
  getProducts() {
    // console.log(this.products)
    return this.products;
  }

  // metodo getProductbyId
  getProductById(id) {
    const prod = this.products.find(prod => prod.id === id);
    if (prod) {
      // console.log(prod)
      return prod;
    } else {
      throw new Error("Not found");
    }
  }
}

export default ProductManager;
