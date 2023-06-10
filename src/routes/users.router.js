import express from "express";
import { userService } from "../services/users.service.js";
export const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      payload: users,
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

usersRouter.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userService.getOne(uid);
    if (user) {
      return res.status(200).json({
        status: "succes",
        msg: "product find.",
        payload: user,
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Error",
      msg: err.message,
    });
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const userCreated = await userService.createOne(body);
    return res.status(201).json({
      status: "succes",
      msg: "user created.",
      payload: { userCreated },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error.",
      msg: e.message,
      payload: {},
    });
  }
});

usersRouter.put("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const body = req.body;

    await userService.updateOne(uid, body);
    return res.status(201).json({
      status: "success",
      msg: "user uptaded",
      payload: {},
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

usersRouter.delete("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const deleteUser = await userService.deleteOne(uid);
    return res.status(200).json({
      status: "succes",
      msg: "user deleted.",
      payload: { deleteUser },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error.",
      msg: err.message,
      payload: {},
    });
  }
});
