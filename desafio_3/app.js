import express from "express";
import ProductManager from "../desafio_2/productManager";

const productManager = new ProductManager();

const path = "./products.json";
const PORT = 4000;
const app = express();

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  console.log(req.query);
  const { limit } = req.query;
  if (limit) {
    const productsFiltered = products.slice(0, limit);
    return res.send(productsFiltered);
  }

  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  const prodById = await productManager.getProductById(parseInt(id));

  if (!prodById) {
    res.send("Producto no encontrado");
  }
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
