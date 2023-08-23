import express from "express";
import { __dirname } from "./path.js";
import multer from "multer";
import path from "path";

import prodsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";

const filepath = "./products.json";
const PORT = 8080;
const app = express();

//Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "/public")));
//const upload = multer({ storage: storage });

// config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

// app.post("/upload", upload.single('product'), (req, res) => {
//   console.log(req.file);
//console.log(re.body)
//res.status(200).send("imagen cargada")
// });

// app.get("/products", async (req, res) => {
//   const products = await productManager.getProducts();
//   console.log(req.query);
//   const { limit } = req.query;
//   if (limit) {
//     const productsFiltered = products.slice(0, limit);
//     return res.send(productsFiltered);
//   }

//   res.send(products);
// });

// app.get("/products/:id", async (req, res) => {
//   const { id } = req.params;

//   const prodById = await productManager.getProductById(parseInt(id));

//   if (!prodById) {
//     res.send("Producto no encontrado");
//   }
// });

// configuro la ruta de productos y carrito

app.use("/api/products", prodsRouter);
app.use("/api/carts", cartRouter);

console.log(__dirname);
console.log(path.join(__dirname, "/public"));

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
