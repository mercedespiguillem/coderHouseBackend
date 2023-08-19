import { Router } from "express";
//import CartManager from "../../contenedores/cartManager.js";

const cartRouter = Router();
//const cartAPI = new CartManager();


cartRouter.get("/:cid", async (req, res => {
//ruta que me muestra los productos del carrito x
}) )


cartRouter.post("/", async (req, res => {
// ruta que crea un nuevo carrito con estructura: idcart y array de productos    
}) )

cartRouter.post("/:cid/product/:pid", async (req, res => {
    //ruta que agrega un producto(solo muestra id y quantity) segun su id, en el carrito x
}))





export default cartRouter;