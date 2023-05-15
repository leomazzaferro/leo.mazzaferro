import fs, { stat } from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor() {
    //this.products = [];
    const productString = fs.readFileSync("products.json", "utf-8");
    const products = JSON.parse(productString);
    this.products = products;
  }

  getProducts() {
    return this.products;
  }

  getProductById(pid) {
    const findProduct = this.products.find((product) => product.pid == pid);
    if (findProduct) {
      return findProduct;
    } else {
      //console.log("Poducto no encontrado.");
      throw new Error("Producto no encontrado.");
    }
  }

  deleteProduct(pid) {
    let index = this.products.findIndex((product) => product.pid == pid);
    if (index !== -1) {
      this.products.splice(index, 1);
      return;
    } else {
      throw new Error("Producto no encontrado para borrar.");
    }
  }

  addProduct(title, description, category, price, thumbnail, code, stock) {
    let generateId = uuidv4();
    let repeatCode = this.products.find((product) => product.code === code)
      ? true
      : false;
    const newProduct = {
      pid: generateId,
      createdAt: Date.now(),
      status: true,
      title,
      description,
      category,
      price,
      thumbnail,
      code,
      stock,
    };
    if (!title || !description || !category || !price || !code || !stock) {
      throw new Error("Todos los campos son obligatorios.");
    } else if (repeatCode === true) {
      throw new Error("Codigo de producto ya ingresado.");
    } else {
      this.products.push(newProduct);
    }
  }

  updateProduct(
    pid,
    status,
    title,
    description,
    category,
    price,
    thumbnail,
    code,
    stock
  ) {}
}

//const productManager = new ProductManager()

//console.log(productManager.getProducts())
