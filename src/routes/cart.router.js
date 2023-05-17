import express from "express";
export const cartRouter = express.Router();
import CartManager from "../classes/cartManager.js";

const cartManager = new CartManager("./src/data/cart.json");

cartRouter.get("/get", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    return res.status(200).json({
      status: "succes",
      msg: "Todos los carritos.",
      data: carts,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      msg: err.message,
    });
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    return res.status(200).json({
      status: "succes",
      msg: "Carrito creado.",
      data: newCart,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      msg: err.message,
    });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartManager.getCartByID(cid);
    if (cart) {
      return res.status(200).json({
        status: "succes",
        msg: "Carrito solicitado.",
        data: cart,
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      msg: err.message,
    });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    await cartManager.addProductToCart(cid, pid);
    return res.status(200).json({
      status: "succes",
      msg: "carrito actualizado",
      data: cartManager.carts.find((c) => c.cid == cid),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
