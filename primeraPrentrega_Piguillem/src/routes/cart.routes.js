import { Router } from "express";
import CartManager from "../../contenedores/cartManager.js";

const cartRouter = Router();
const cartAPI = new CartManager();

cartRouter.get("/:cid", async (req, res) => {
  //ruta que me muestra los productos del carrito x
  const { id } = req.params;
  const cartById = await cartAPI.getCartById(parseInt({ id }));
  if (cartById) {
    res.status(200).send(cartById.products);
  } else {
    res.status(404).send("Carrito no encontrado");
  }
});

cartRouter.post("/", async (req, res) => {
  // ruta que crea un nuevo carrito 
  const newcart = await cartAPI.saveNewCart()

  res.json(newcart);
  const carts = cartAPI.getAllcarts();

  res.json(console.log("Nuevo carrito agregado"));
  res.json(console.log(carts));
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  //ruta que agrega un producto(solo muestra id y quantity) segun su id, en el carrito x

  const { cid } = req.params.cid;
  const { pid } = req.params.pid;

  const cart = cartAPI.getCartById(parseInt( cid ));

  if (!cart) {
    return res.status(404).json({ message: "Carrito no encontrado" });
  } else { 
    const add = await cartAPI.addProductToCart(cid, pid)
    if (add)
            res.status(200).send("Producto agregado correctamente")
        else
            res.status(400).send("Error al agregar producto")
  }
  return cart
});

export default cartRouter;
