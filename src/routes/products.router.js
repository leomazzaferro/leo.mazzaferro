import express from "express";
import { productService } from "../services/products.service.js";
import { userService } from "../services/users.service.js";

export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json({
      status: "success",
      msg: "list products.",
      payload: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: e.message,
      payload: {},
    });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.getOne(pid);
    return res.status(200).json({
      status: "succes",
      msg: "product find.",
      payload: product,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Error",
      msg: err.message,
    });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const deleteProduct = await productService.deleteOne(pid);
    return res.status(200).json({
      status: "succes",
      msg: "product deleted.",
      payload: deleteProduct,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error.",
      msg: err.message,
      payload: {},
    });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const productCreated = await productService.createOne(body);
    return res.status(201).json({
      status: "success",
      msg: "product created.",
      payload: productCreated,
    });
  } catch (e) {
    return res.status(500).json({
      status: "error",
      msg: e.message,
      payload: {},
    });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    const productUpdate = await productService.updateOne(pid, body);
    return res.status(201).json({
      status: "succes",
      msg: "product updated.",
      payload: productUpdate,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      msg: err.message,
      payload: {},
    });
  }
});

/* productsRouter.get("/", async (req, res) => {
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
      msg: "hola",
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
        msg: "Producto encontrado",
        data: product,
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Error",
      msg: err.message,
    });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const deletedProduct = await productManager.deleteProduct(pid);
    return res.status(200).json({
      status: "Succes.",
      msg: "Producto eliminado.",
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
    //console.log(body);
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
 */
