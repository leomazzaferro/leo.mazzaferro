import express from "express";
import { UserModel } from "../DAO/models/users.models.js";
export const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
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
    const product = await ProductsModel.findOne(uid);
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

usersRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      console.log(
        "validation error: please complete firstName, lastname and email."
      );
      return res.status(400).json({
        status: "error",
        msg: "please complete firstName, lastname and email.",
        payload: {},
      });
    }
    const userCreated = await UserModel.create({ firstName, lastName, email });
    return res.status(201).json({
      status: "success",
      msg: "user created",
      payload: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error.",
      msg: "something baaaaad :(",
      payload: {},
    });
  }
});

usersRouter.put("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email || !uid) {
      console.log(
        "validation error: please complete firstName, lastname and email."
      );
      return res.status(400).json({
        status: "error",
        msg: "please complete firstName, lastname and email.",
        payload: {},
      });
    }
    const userUptaded = await UserModel.updateOne(
      { _id: uid },
      { firstName, lastName, email }
    );
    return res.status(201).json({
      status: "success",
      msg: "user uptaded",
      payload: userUptaded,
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

usersRouter.delete("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const deleteUser = await UserModel.findByIdAndDelete(uid);
    if (deleteUser) {
      return res.status(200).json({
        status: "succes",
        msg: "user deleted.",
        payload: deleteUser,
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "user not found.",
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
