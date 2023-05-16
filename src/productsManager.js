import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    const productString = fs.readFileSync(this.path, "utf-8");
    const products = JSON.parse(productString);
    this.products = products;
  }

  getProducts(limit) {
    if (limit) {
      const productsLimited = this.products.slice(0, limit);
      return productsLimited;
    } else {
      return this.products;
    }
  }

  getProductById(pid) {
    const findProduct = this.products.find((product) => product.pid == pid);
    if (findProduct) {
      return findProduct;
    } else {
      throw new Error("Producto no encontrado.");
    }
  }

  deleteProduct(pid) {
    let index = this.products.findIndex((product) => product.pid == pid);
    console.log(index);
    if (index !== -1) {
      this.products.splice(index, 1);
      return this.products[index];
    } else {
      throw new Error("Producto no encontrado para borrar.");
    }
  }

  addProduct(body) {
    let generateId = uuidv4();
    let repeatCode = this.products.find((product) => product.code === code)
      ? true
      : false;
    const newProduct = {
      pid: generateId,
      createdAt: Date.now(),
      status: true,
      ...body,
    };
    if (!title || !description || !category || !price || !code || !stock) {
      throw new Error("Todos los campos son obligatorios.");
    } else if (repeatCode === true) {
      throw new Error("Codigo de producto ya ingresado.");
    } else {
      this.products.push(newProduct);
    }
  }

  updateProduct(pid, body) {
    const productIndex = this.products.findIndex(
      (product) => product.pid == pid
    );
    if (productIndex == -1) {
      throw new Error("No se pudo actualizar el producto.");
    }
    const updatedProduct = { ...this.products[productIndex], ...body };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }
}
