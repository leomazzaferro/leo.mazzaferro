import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { cartRouter } from "./routes/cart.router.js";
import { homeRouter } from "./routes/home.router.js";
import { productsRouter } from "./routes/products.router.js";
import { realTimeProductsRouter } from "./routes/real-time-products.router.js";
import { __dirname } from "./utils.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//MOTOR HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//PORT
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto http://localhost:${PORT}`);
});

//SOCKET
app.use("", realTimeProductsRouter);
//productmanager para socket
import ProductManager from "./classes/productsManager.js";
const productManager = new ProductManager("./src/data/products.json");
const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  console.log("Nuevo usuario conectado.(BACK)");
  const emitProductList = async () => {
    const productsList = await productManager.getProducts();
    socket.emit("new-products-list", productsList);
  };
  emitProductList();
  //console.log("listPRoducts");
  socket.on("add-product", async (newProduct) => {
    try {
      console.log(newProduct);
      await productManager.addProduct(newProduct);
      const newProductsList = await productManager.getProducts();
      /* console.log(newProductsList); */
      emitProductList();
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("delete-product", async (productId) => {
    try {
      await productManager.deleteProduct(productId);
      emitProductList();
    } catch (err) {
      console.log(err);
    }
  });
});

//ENDPOINTS
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);

//PLANTILLAS
app.use("", homeRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    error: "No se encuentra la ruta",
  });
});
