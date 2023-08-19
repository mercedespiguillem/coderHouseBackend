import { Router } from "express";
import ProductManager from "../../contenedores/productManager.js";

const prodsRouter = Router();
const productsAPI = new ProductManager();

prodsRouter.get("/", async (req, res) => {
  const products = await productsAPI.getProducts();
  console.log(req.query);
  const { limit } = req.query;

  const productsFiltered = products.slice(0, limit);
  res.status(200).send(productsFiltered);
});

//NO FUNCIONA, ME DICE SIEMPRE PROD NO ENCONTRADO
prodsRouter.get("/:pid", async (req, res) => {
  const { id } = req.params;

  const prodById = await productsAPI.getProductById(parseInt({ id }));

  if (prodById) {
    res.status(200).send(prodById);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});


prodsRouter.post("/", async (req, res) => {
  // funciona pero me falta autogenerar un id para el nuevo producto
  const newProd = await productsAPI.addProduct(req.body);

  res.json(newProd);
  const products = productsAPI.getProducts();

  res.json(console.log("Nuevo producto agregado"));
  res.json(console.log(products));
});

//NO ME RECONOCE EL ID QUE ENVIO EN LA RUTA Y SIEMPRE ME RESPONDE HA SIDO ACTUALIZADO
prodsRouter.put("/:pid", async (req, res) => {
  const param = req.params.id;
  const property = req.body;
  productsAPI.updateProduct(param, property);
  res.json(`El producto con id ${param} ha sido actualizado`);
});


prodsRouter.delete("/:pid", async (req, res) => {
  const param = req.params.id;

  res.json(await productsAPI.deleteProduct(param));
});

export default prodsRouter;
