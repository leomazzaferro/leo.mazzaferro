import { CartsModel } from "../DAO/models/carts.models.js";

class CartService {
  async getAll() {
    const carts = await CartsModel.find({})
      .populate("users.user")
      .populate("products.product");
    if (!carts) {
      throw new Error("carts not found.");
    }
    return carts;
  }

  async getOne(_id) {
    const cart = await CartsModel.findOne({ _id })
      .populate("users.user")
      .populate("products.product");
    if (!cart) {
      throw new Error("cart not found.");
    }
    return cart;
  }

  async deleteCart(_id) {
    const deleteCart = await CartsModel.findByIdAndDelete(_id);
    if (!deleteCart) {
      throw new Error("cant delete cart.");
    }
    return deleteCart;
  }

  async createCart() {
    const newCart = await CartsModel.create({});
    if (!newCart) {
      throw new Error("cant create.");
    }
    return newCart;
  }

  async addToCart(cid, uid, pid) {
    const cart = await CartsModel.findById(cid);
    if (!cart) {
      throw new Error("cart not found.");
    }
    cart.users.push({ user: uid });
    cart.products.push({ product: pid });
    const res = await CartsModel.updateOne({ _id: cid }, cart);
    return res;
  }
}

export const cartService = new CartService();
