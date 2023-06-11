import { ProductsModel } from "../DAO/models/products.models.js";

class ProductService {
  async getAll() {
    const products = await ProductsModel.find({});
    if (!products) {
      throw new Error("products not found.");
    }
    return products;
  }
  async getOne(_id) {
    const product = await ProductsModel.findOne({ _id });
    console.log(product);
    if (!product) {
      throw new Error("product not found.");
    }
    return product;
  }

  ///ver el error
  async deleteOne(_id) {
    const productDelete = await ProductsModel.findByIdAndDelete(_id);
    if (!productDelete) {
      throw new Error("product not found.");
    }
    return productDelete;
  }

  async createOne(body) {
    const { title, description, category, price, code, stock } = body;
    //const productExist = await ProductsModel.exists({ code: code });
    /* if (!title || !description || !category || !price || !code || !stock) {
      throw new Error("all fields are required.");
    } else if (productExist) {
      throw new Error("code alredy exist.");
    } */
    const productCreated = await ProductsModel.create({
      title,
      description,
      price,
      category,
      code,
      stock,
    });
    return productCreated;
  }

  async updateOne(_id, body) {
    const { title, description, category, price, code, stock } = body;
    if (!title || !description || !category || !price || !code || !stock) {
      throw new Error("all fields are required.");
    }
    const productUpdate = await ProductsModel.updateOne(
      { _id },
      {
        title,
        description,
        category,
        price,
        code,
        stock,
      }
    );
    return productUpdate;
  }
}

export const productService = new ProductService();
