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

prodsRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params;
  
    const prodById = await productsAPI.getProductById(parseInt( pid ));

  if (prodById) {
    res.status(200).send(prodById);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});


prodsRouter.post("/", async (req, res) => {
  const newProd = await productsAPI.addProduct(req.body);

  res.json(newProd);
  const products = productsAPI.getProducts();
  if (newProd) {
    res.status(200).send("Producto agregado correctamente")
} else {
    res.status(400).send("Error al agregar producto")
}
  res.json(console.log(products));
});

prodsRouter.put("/:pid", async (req, res) => {
  const prodUpdated = await productManager.updateProduct(parseInt(req.params.id), req.body)
  if (prodUpdated) {
    res.status(200).send("Producto actualizado correctamente")
} else {
    res.status(400).send("Error en actualizar producto")
}
});


prodsRouter.delete("/:pid", async (req, res) => {

  const deleted = await productManager.deleteProduct(parseInt(req.params.id))

  if (deleted) {
      res.status(200).send("Producto eliminado correctamente")
  } else {
      res.status(400).send("Error al eliminar producto")
  }

});



export default prodsRouter;
