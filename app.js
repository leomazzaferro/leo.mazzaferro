import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager();

app.get("/productos", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    if (req.query.limit) {
      const limit = parseInt(req.query.limit);
      const productsLimited = products.slice(0, limit);
      return res.status(200).json({
        status: "succes",
        msj: "Productos requeridos",
        data: productsLimited,
      });
    } else {
      return res.status(200).json({
        status: "succes",
        msj: "Todos los productos.",
        data: products,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Error",
      msj: err.message,
    });
  }
});

app.get("/productos/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    if (product) {
      res.status(200).json({
        status: "succes",
        msj: "Producto encontrado",
        data: product,
      });
    } else {
      res.status(404).json({
        status: "Error",
        msj: err.message,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Error",
      msj: err.message,
    });
  }
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
