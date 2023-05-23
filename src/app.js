import express from "express";
import handlebars from "express-handlebars";
import { cartRouter } from "./routes/cart.router.js";
import { productsRouter } from "./routes/products.router.js";
import { indexRouter } from "./routes/index.router.js";
import { socketRouter } from "./routes/socket.router.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

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
app.use("", socketRouter);
const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  console.log("Nuevo usuario conectado.");
  socket.on("message", (data) => {
    console.log(data);
  });
  socket.on("message-2", (data) => {
    console.log(data);
  });
});

//ENDPOINTS
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);

//PLANTILLAS
app.use("", indexRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    error: "No se encuentra la ruta",
  });
});
