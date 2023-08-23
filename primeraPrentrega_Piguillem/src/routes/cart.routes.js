import { Router } from "express";
import CartManager from "../../contenedores/cartManager.js";

const cartRouter = Router();
const cartAPI = new CartManager();

cartRouter.get("/:cid", async (req, res) => {
  //ruta que me muestra los productos del carrito x
  const { id } = req.params;
  const cartById = await cartAPI.getCartById(parseInt({ id }));
  if (cartById) {
    res.status(200).send(cartById);
  } else {
    res.status(404).send("Carrito no encontrado");
  }
});

cartRouter.post("/", async (req, res) => {
  // ruta que crea un nuevo carrito con estructura: idcart y array de productos
  const newcart = await cartAPI.saveNewCart(req.body);

  res.json(newcart);
  const carts = cartAPI.getAllcarts();

  res.json(console.log("Nuevo carrito agregado"));
  res.json(console.log(carts));
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  //ruta que agrega un producto(solo muestra id y quantity) segun su id, en el carrito x

  const cartid = parseInt(req.params.cid);
  const prodid = parseInt(req.params.pid);

  const cart = cartAPI.getCartById(cartid);

  if (!cart) {
    return res.status(404).json({ message: "Carrito no encontrado" });
  }
  const prodx = cart.products.findIndex((prod) => prod.id === prodid);

  if (prodx !== -1) {
    cart.products[prodx].quantity += 1;
  } else {
    cart.products.push({ id: prodid, quantity: 1 });
  }
});

export default cartRouter;
