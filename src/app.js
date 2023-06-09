import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./config.js";
import { cartRouter } from "./routes/cart.router.js";
import { homeRouter } from "./routes/home.router.js";
import { productsRouter } from "./routes/products.router.js";
import { realTimeProductsRouter } from "./routes/real-time-products.router.js";
import { testChatRouter } from "./routes/test-chat-router.js";
import { usersRouter } from "./routes/users.router.js";
import { connectMongo } from "./utils/db-conection.js";
import { connectSocketServer } from "./utils/socket-server.js";

const app = express();
const PORT = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//MOTOR HANDLEBARS - Config Plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//PORT
export const httpServer = app.listen(PORT, () => {
  console.log(
    `App running on ${__dirname} - Servidor iniciado en puerto http://localhost:${PORT}`
  );
});

//SOCKET
connectSocketServer(httpServer);
app.use("/real-time-products", realTimeProductsRouter);

//CHAT
app.use("/test-chat", testChatRouter);

//USERS
app.use("/api/users", usersRouter);

//ENDPOINTS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

//PLANTILLAS
app.use("/", homeRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    error: "No se encuentra la ruta",
  });
});
