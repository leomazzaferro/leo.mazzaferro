import { Schema, model } from "mongoose";

const schema = new Schema({
  products: {
    type: [
      {
        productId: { type: String, max: 100 },
        quantity: { type: String },
      },
    ],
    required: true,
    max: 100,
  },
});

export const CartsModel = model("carts", schema);
