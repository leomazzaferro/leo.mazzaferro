import express from "express";

export const socketRouter = express.Router();

socketRouter.get("/socket", async (req, res) => {
  try {
    return res.status(200).render("socket", { style: "main.css" });
  } catch (err) {
    return res.status(500).json({
      status: "Error.",
      msg: err.message,
    });
  }
});
