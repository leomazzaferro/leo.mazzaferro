import express from "express";
import { ProductsModel } from "../DAO/models/products.models.js";

export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await ProductsModel.find({});
    return res.status(200).json({
      status: "success",
      msg: "list products.",
      payload: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductsModel.findOne(pid);
    if (product) {
      return res.status(200).json({
        status: "succes",
        msg: "product find.",
        payload: product,
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Error",
      msg: err.message,
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
        payload: {},
      });
    } else if (productExist) {
      return res.status(400).json({
        status: "error",
        msg: "code alredy exist.",
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
      msg: "user created.",
      payload: productCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const { title, description, category, price, code, stock } = req.body;
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !code ||
      !stock ||
      !pid
    ) {
      console.log("validation error");
      return res.status(400).json({
        status: "error",
        msg: "validation error, all fields required.",
        payload: {},
      });
    }
    const productUpdate = await ProductsModel.updateOne(
      { pid },
      {
        title,
        description,
        category,
        price,
        code,
        stock,
      }
    );
    return res.status(201).json({
      status: "succes",
      msg: "product updated.",
      payload: productUpdate,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      msg: err.message,
    });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const deleteProduct = await ProductsModel.findByIdAndDelete(pid);
    if (deleteProduct) {
      return res.status(200).json({
        status: "succes",
        msg: "product deleted.",
        payload: deleteProduct,
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "product not found.",
        payload: {},
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error.",
      msg: "something baaad :(",
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
