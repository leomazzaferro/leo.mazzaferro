import express from "express";
import ProductManager from "../classes/productsManager.js";

const productManager = new ProductManager("./src/data/products.json");

export const indexRouter = express.Router();

indexRouter.get("/index", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    return res.status(200).render("index", { products });
  } catch (err) {
    return res.status(500).json({
      status: "Error.",
      msg: err.message,
    });
  }
});
