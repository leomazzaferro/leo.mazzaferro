import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class CartManager {
  constructor(path) {
    this.path = path;
    const cartString = fs.readFileSync(this.path, "utf-8");
    const carts = JSON.parse(cartString);
    this.carts = carts;
  }

  getCarts() {
    return this.carts;
  }

  createCart() {
    const cartId = uuidv4();
    const newCart = { id: cartId, product: [] };
    this.carts.push(newCart);
    console.log(newCart);
    return newCart;
  }

  getCartByID(cid) {
    console.log(cid);
    const findCart = this.carts.find((cart) => cart.cid == cid);
    console.log(findCart);
    if (findCart) {
      return findCart;
    } else {
      throw new Error("Carrito no encontrado");
    }
  }

  addProductToCart() {}
}
