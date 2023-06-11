import { CartsModel } from "../DAO/models/carts.models.js";

class CartService {
  async getAll() {
    const carts = await CartsModel.find({});
    if (!carts) {
      throw new Error("carts not found.");
    }
    return carts;
  }
  async getOne({ _id }) {
    const cart = await CartsModel.findById({ _id });
    if (!cart) {
      throw new Error("cart not found.");
    }
    return cart;
  }
  async createCart() {
    const newCart = await CartsModel.create({});
    if (!newCart) {
      throw new Error("cant create.");
    }
    return newCart;
  }
  async addToCart(cid, _id, body) {
    const cart = await CartsModel.findById(cid);
    console.log(cart);
    if (!cart) {
      throw new Error("cart not found.");
    }
    const { pid, quantity } = body;
  }
}

export const cartService = new CartService();
