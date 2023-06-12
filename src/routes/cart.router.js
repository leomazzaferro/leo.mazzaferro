import express from "express";
import { cartService } from "../services/carts.service.js";

export const cartRouter = express.Router();

cartRouter.get("/get", async (req, res) => {
  try {
    const carts = await cartService.getAll();
    return res.status(200).json({
      status: "succes",
      msg: "all carts.",
      payload: carts,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      msg: err.message,
      payload: {},
    });
  }
});

cartRouter.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const cart = await cartService.getOne(_id);
    return res.status(200).json({
      status: "succes",
      msg: "cart.",
      payload: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
      payload: {},
    });
  }
});

cartRouter.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteCart = await cartService.deleteCart(_id);
    return res.status(200).json({
      status: "succes",
      msg: "cart deleted.",
      payload: deleteCart,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
      payload: {},
    });
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    return res.status(200).json({
      status: "succes",
      msg: "Carrito creado.",
      payload: newCart,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      msg: err.message,
    });
  }
});

cartRouter.post("/:cid/:uid/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const uid = req.params.uid;
    const pid = req.params.pid;
    const carts = await cartService.addToCart(cid, uid, pid);
    return res.status(200).json({
      status: "succes",
      msg: "product added.",
      payload: carts,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      msg: error.message,
      payload: {},
    });
  }
});
