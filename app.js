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
    return res.status(500).json({
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
      return res.status(200).json({
        status: "succes",
        msj: "Producto encontrado",
        data: product,
      });
    } /* else {
      return res.status(404).json({
        status: "Error",
        msj: err.message,
      });
    }*/
  } catch (err) {
    return res.status(404).json({
      status: "Error",
      msj: err.message,
    });
  }
});

app.delete("/productos/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    await productManager.deleteProduct(pid);
    return res.status(200).json({
      status: "Succes.",
      msj: "Producto eliminado.",
      data: {},
    });
  } catch (err) {
    return res.status(404).json({
      status: "Error",
      msj: err.message,
    });
  }
});

app.post("/productos", async (req, res) => {
  try {
    const { title, description, category, price, thumbnail, code, stock } =
      req.body;
    const newProduct = await productManager.addProduct(
      title,
      description,
      category,
      price,
      thumbnail,
      code,
      stock
    );
    return res.status(201).json({
      status: "Succes",
      msg: "Producto agregado.",
      data: newProduct,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      msg: err.message,
    });
  }
});

app.put("/productos/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const {
      status,
      title,
      description,
      category,
      price,
      thumbnail,
      code,
      stock,
    } = req.body;
    const productUpdate = await productManager.updateProduct(pid);
    return res.status(200).json({
      status: "succes",
      msg: "Producto actualizado",
      data: productUpdate,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      msg: err.message,
    });
  }
});

app.get("*", (req, res) => {
  return res.status(404).json({
    error: "No se encuentra la ruta",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto http://localhost:${PORT}`);
});

/*app.get("/bienvenida", (req, res) => {
  const html = `<html> <body> <h1 style="color: blue"> Bienvenidos!! </h1> </body> </html>`;
  res.send(html);
});

app.get("/usuario", (req, res) => {
  const usuario = {nombre: "Leo", apellido: "Mazzaferro", edad: 31};
  res.send(usuario);
});*/
