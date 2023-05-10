import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const PORT = 8080;

const productManager = new ProductManager();

app.get("/productos", (req, res) => {
  const products = productManager.getProducts();
  if (req.query.limit) {
    const limit = parseInt(req.query.limit);
    const productsLimited = products.slice(0, limit);
    res.send(productsLimited);
  } else {
    res.send(productManager.getProducts());
  }
});

app.get("/productos/:id", (req, res) => {
  const id = req.params.id;
  res.send(productManager.getProductById(id));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});

/*app.get("/bienvenida", (req, res) => {
  const html = `<html> <body> <h1 style="color: blue"> Bienvenidos!! </h1> </body> </html>`;
  res.send(html);
});

app.get("/usuario", (req, res) => {
  const usuario = {nombre: "Leo", apellido: "Mazzaferro", edad: 31};
  res.send(usuario);
});*/
