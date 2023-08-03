import ProductManager from "./productManager.js";
import Product from "./product.js";

const managerTest = new ProductManager();
const prod1 = new Product("Pantalon", "pantalon de jean", 1500, "picture", 50);
const prod2 = new Product("Remera", "remera de algodon", 120, "picture", 110);

// console.log(managerTest.getProducts())

managerTest.addProduct(prod1);
managerTest.addProduct(prod2);

managerTest.getProducts();
console.log(managerTest.getProducts())
console.log(managerTest.getProductById(1));
