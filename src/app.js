import cookieParser from "cookie-parser";
import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./config.js";
import { cartRouter } from "./routes/cart.router.js";
import { homeRouter } from "./routes/home.router.js";
import { productsRouter } from "./routes/products.router.js";
import { realTimeProductsRouter } from "./routes/real-time-products.router.js";
import { chatRouter } from "./routes/test-chat-router.js";
import { usersRouter } from "./routes/users.router.js";
import { viewsRouter } from "./routes/views.router.js";
import { connectMongo } from "./utils/db-conection.js";
import { connectSocketServer } from "./utils/socket-server.js";
import session from "express-session";

const app = express();
const PORT = 8080;

//PORT
export const httpServer = app.listen(PORT, () => {
  console.log(
    `App running on ${__dirname} - Servidor iniciado en puerto http://localhost:${PORT}`
  );
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//MOTOR HANDLEBARS - Config Plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

connectMongo();
connectSocketServer(httpServer);

//app.use(cookieParser("yVRqmOIz862r7Vq"));
app.use(
  session({ secret: "yVRqmOIz862r7Vq", resave: true, saveUninitialized: true })
);

//SOCKET
app.use("/real-time-products", realTimeProductsRouter);
app.use("/test-chat", chatRouter);

//API ENDPOINTS
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

//PLANTILLAS CON HTML
app.use("/", homeRouter);
app.use("/", viewsRouter);

//SESSION
app.get("/session", async (req, res) => {
  if (req.session?.count) {
    req.session.count++;
    res.send(JSON.stringify(req.session));
  } else {
    req.session.count = 1;
    req.session.club = "NOB";
    res.send(JSON.stringify(req.session));
  }
});

app.get("/login", async (req, res) => {
  const { username, password } = req.query;
  if (username !== "pepe" || password !== "pepepass") {
    return res.send("login failed");
  }
  req.session.user = username;
  req.session.admin = false;
  res.send("login success!!");
});

function checkLogin(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).send("error autentication");
  }
}

app.get("/profile", checkLogin, (req, res) => {
  return res.send("all profile");
});

app.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "LogOut ERROR" });
    }
    res.send("LogOut OK");
  });
});

//COOCKIES
app.use("/set-cookies", async (req, res) => {
  res.cookie("money", "5000", {
    maxAge: 100000,
    signed: true,
  });
  return res.json({
    status: "succes",
    msg: "llego una cookie",
    payload: {},
  });
});

app.get("*", (req, res) => {
  console.log(req.session);
  return res.status(404).json({
    error: "No se encuentra la ruta",
  });
});
