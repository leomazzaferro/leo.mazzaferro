import { CartsModel } from "../DAO/models/carts.models.js";

class CartService {
  async getAll() {
    const carts = await CartsModel.find({}); /* .populate("products.product") */
    if (!carts) {
      throw new Error("carts not found.");
    }
    return carts;
  }

  async getOne(cid) {
    const cart = await CartsModel.findById(cid).populate("products.product");
    if (!cart) {
      throw new Error("cart not found.");
    }
    return cart;
  }

  async deleteProduct(cid, pid) {
    const cart = await CartsModel.findById(cid);
    console.log(cart);
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === pid
    );
    console.log(productIndex);
    if (!productIndex === -1) {
      throw new Error("product not found in cart.");
    }
    cart.products.splice(productIndex, 1);
    await cart.save();
    return cart;
  }

  async deleteCart(cid) {
    const deleteCart = await CartsModel.findById(cid);
    if (deleteCart) {
      deleteCart.products = [];
      await deleteCart.save();
      return deleteCart;
    } else {
      throw new Error("cant clear cart.");
    }
  }

  async createCart() {
    const newCart = await CartsModel.create({});
    if (!newCart) {
      throw new Error("cant create.");
    }
    return newCart;
  }

  async addToCart(cid, pid) {
    const cart = await CartsModel.findById(cid);
    if (!cart) {
      throw new Error("cart not found.");
    }
    const cartUpdate = cart.products.find((p) => p.product.toString() === pid);
    console.log(cartUpdate);
    if (!cartUpdate) {
      cart.products.push({ product: pid });
      const res = await CartsModel.updateOne({ _id: cid }, cart);
      return res;
    } else {
      cartUpdate.quantity++;
      const res = await CartsModel.updateOne({ _id: cid }, cart);
      return res;
    }
  }

  async updateCart(cid, body) {
    const cart = await CartsModel.findByIdAndUpdate(cid, { body });
    console.log(cart);
    return cart;
  }

  async updateQuantity(cid, pid, quantity) {
    console.log(cid, pid, quantity);
    const cart = await CartsModel.findById(cid);
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === pid
    );
    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }
    cart.products[productIndex].quantity = quantity;
    await cart.save();
    console.log(cart);
    return cart;
  }
}

export const cartService = new CartService();
