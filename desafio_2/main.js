import ProductManager from "./productManager.js";
import Product from "./product.js";

const managerTest = new ProductManager();
const prod1 = new Product("Pantalon", "pantalon de jean", 1500, "picture", 50);
const prod2 = new Product("Remera", "remera de algodon", 120, "picture", 110);
const prod3 = new Product("buzo", "algodon", 1320, "picture", 110);

// managerTest.addProduct(prod3);
console.log(managerTest.getProducts());
// managerTest.addProduct(prod2);
// console.log(managerTest.getProducts());
// managerTest.getProducts();
managerTest.getProducts();
// console.log(managerTest.getProductById(2));
managerTest.deleteProduct(2)