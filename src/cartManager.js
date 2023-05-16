import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.readCarts();
  }

  readCarts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      if (data) {
        this.carts = JSON.parse(data);
      }
    } catch (err) {
      console.log("No se pudo leer el archivo.");
    }
  }

  writeCarts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.carts), "utf-8");
    } catch (err) {
      console.log("No se pudo escribir el archivo.");
    }
  }

  getCarts() {
    return this.carts;
  }

  createCart() {
    const cartId = uuidv4();
    const newCart = { cid: cartId, products: [] };
    this.carts.push(newCart);
    console.log(newCart);
    this.writeCarts();
    return newCart;
  }

  getCartByID(cid) {
    console.log(typeof cid);
    const findCart = this.carts.find((cart) => cart.cid == cid);
    console.log(findCart);
    if (findCart) {
      return findCart;
    } else {
      throw new Error("Carrito no encontrado");
    }
  }

  addProductToCart(cid, pid) {
    const cart = this.carts.find((cart) => cart.cid == cid);
    console.log(cart);
    if (!cart) {
      throw new Error("Carrito no found.");
    }
    const productExist = cart.products.find((product) => product.pid == pid);
    console.log(productExist);
    if (productExist) {
      productExist.quantity++;
    } else {
      cart.products.push({ pid: pid, quantity: 1 });
      this.writeCarts();
      return cart;
    }
  }
}
