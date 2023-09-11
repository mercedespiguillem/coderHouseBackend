import express from "express";
import { __dirname } from "./path.js";
import { engine } from 'express-handlebars';
import { Server } from "socket.io"
import multer from "multer";
import path from "path";
import ProductManager from "../contenedores/productManager.js";

import prodsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
const filepath = "./products.json";
const PORT = 8080
const app = express();


// config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

//Levanto el server en una constante

const serverExpress = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});


//Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine()) //Defino que motor de plantillas voy a utilizar y su config
app.set('view engine', 'handlebars') //Setting de mi app de hbs
app.set('views', path.resolve(__dirname, './views')) //Resuelvo rutas absolutas a traves de rutas relativas

//const upload = multer({ storage: storage })
app.use('/static', express.static(path.join(__dirname, '/public'))) //Unir rutas en una sola concatenandolas




//instancio un nuevo server usando socket.io

const io = new Server(serverExpress)

//hago la conexion con socket
const mensajes = []
const prods = []

const prod = new ProductManager()

//Autenticacion de usuario provisoria
io.on('connection', async (socket) => {
    console.log("Servidor Socket.io conectado")
    socket.on('mensajeConexion', (user) => {
        if (user.rol === "Admin") {
            socket.emit('credencialesConexion', "Usuario valido")
        } else {
            socket.emit('credencialesConexion', "Usuario no valido")
        }
    })

//recibo mensajes y los agrego a un array de mensajes que sera mostrado en el browser
    socket.on('mensaje', (infoMensaje) => {
        console.log(infoMensaje)
        mensajes.push(infoMensaje)
        socket.emit('mensajes', mensajes)
    })
// recibo prod y agrego al array

// carga inicial de productos

const productos = await prod.getProducts();
socket.emit("productos", productos);

// actualizacion de productos

socket.on("new-product", async (product) => {
  await productosApi.save(product);
  const productos = await productosApi.getAll();
  io.sockets.emit("productos", productos);
});

//    socket.on('nuevoProducto', (nuevoProd) => {
  //      prods.push(nuevoProd)
    //    socket.emit('prods', prods)
   // })



})



// configuro la ruta de productos y carrito

app.use("/api/products", prodsRouter);
app.use("/api/carts", cartRouter);

console.log(__dirname);
console.log(path.join(__dirname, "/public"));


app.get('/static', (req, res) => {
 
  /*res.render('chat', {
      css: "style.css",
      title: "Chat",
  })*/

  
  res.render('realTimeProducts', {
    css: "style.css",
    title: "Chat",
    js: "realTimeProducts.js"
})
})


/*app.post('/upload', upload.single('product'), (req, res) => {
  console.log(req.file)
  console.log(req.body)
  res.status(200).send("Imagen cargada")
})*/