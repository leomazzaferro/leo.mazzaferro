import fs from "fs";

export default class ProductManager {
  constructor() {
    //this.products = [];
    const productString = fs.readFileSync("products.json", "utf-8");
    const product = JSON.parse(productString);
    this.products = product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const findProduct = this.products.find((product) => product.id == id);
    if (findProduct) {
      return findProduct;
    } else {
      //console.log("Poducto no encontrado.");
      throw new Error("Producto no encontrado.");
    }
  }
}

//const productManager = new ProductManager()

//console.log(productManager.getProducts())
