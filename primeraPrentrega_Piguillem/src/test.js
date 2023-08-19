import ProductManager from "../contenedores/productManager.js";
import Product from "../contenedores/product.js";

const managerTest = new ProductManager();
const prod1 = new Product("Pantalon", "pantalon de jean", 1500, "picture", 50);
const prod2 = new Product("Remera", "remera de algodon", 120, "picture", 110);
const prod3 = new Product("Gorra", "algodon", 13660, "picture", 110);

// managerTest.addProduct(prod2);
managerTest.addProduct(prod3);
