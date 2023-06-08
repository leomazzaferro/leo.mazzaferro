import express from "express";
import { ProductsModel } from "../DAO/models/products.models.js";

export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await ProductsModel.find({});
    return res.status(200).json({
      status: "success",
      msg: "listado de productos",
      data: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const { title, description, category, price, code, stock } = req.body;
    const productExist = await ProductsModel.exists({ code: code });
    if (!title || !description || !category || !price || !code || !stock) {
      console.log(
        "validation error: please complete title, lastname and price."
      );
      return res.status(400).json({
        status: "error",
        msg: "please complete title, lastname and price.",
        data: {},
      });
    } else if (productExist) {
      return res.status(400).json({
        status: "Error.",
        msg: "Code alredy exist.",
        payload: {},
      });
    }
    const productCreated = await ProductsModel.create({
      title,
      description,
      price,
      category,
      code,
      stock,
    });
    return res.status(201).json({
      status: "success",
      msg: "user created",
      data: productCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

productsRouter.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, description, category, price, code, stock } = req.body;
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !code ||
      !stock ||
      !_id
    ) {
      console.log("Validation error");
      return res.status(400).json({
        status: "Error",
        msg: "Validation error, all fields required.",
        payload: {},
      });
    }
    const productUpdate = await ProductsModel.updateOne(
      { _id },
      { title, description, category, price, code, stock }
    );
    return res.status(201).json({
      status: "Succes.",
      msg: "Product updated.",
      payload: productUpdate,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      msg: err.message,
    });
  }
});

productsRouter.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteProduct = await ProductsModel.findByIdAndDelete({ _id });
    if (deleteProduct) {
      return res.status(200).json({
        status: "Succes.",
        msg: "Product deleted.",
        payload: deleteProduct,
      });
    } else {
      return res.status(404).json({
        status: "Error.",
        msg: "Product not found.",
        payload: {},
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "Error.",
      msg: "Something baaad.",
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
