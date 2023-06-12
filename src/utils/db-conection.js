import { connect } from "mongoose";
import { CartsModel } from "../DAO/models/carts.models.js";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://leomazza:34381065Lm@backend.n1ips6k.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "backend",
      }
    );
    console.log("plug to mongo!");
    //const create = await CartsModel.create({});
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
