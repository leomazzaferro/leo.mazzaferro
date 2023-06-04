import express from "express";

export const testChatRouter = express.Router();

testChatRouter.get("/", async (req, res) => {
  try {
    return res.status(200).render("test-chat", { style: "main.css" });
  } catch (err) {
    return res.status(500).json({
      status: "Error.",
      msg: err.message,
    });
  }
});
