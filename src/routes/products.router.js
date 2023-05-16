import express from "express";
export const productsRouter = express.Router();
import ProductManager from "../productsManager.js";

const productManager = new ProductManager("./src/products.json");

productsRouter.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await productManager.getProducts(limit);
    return res.status(200).json({
      status: "succes",
      msg: "Productos",
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      msj: "hola",
    });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    if (product) {
      return res.status(200).json({
        status: "succes",
        msj: "Producto encontrado",
        data: product,
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Error",
      msj: err.message,
    });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const deletedProduct = await productManager.deleteProduct(pid);
    return res.status(200).json({
      status: "Succes.",
      msj: "Producto eliminado.",
      data: deletedProduct,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Error",
      msj: err.message,
    });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newProduct = await productManager.addProduct(body);
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

productsRouter.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const body = req.body;
    const productUpdate = await productManager.updateProduct(pid, body);
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
