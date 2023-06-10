import { ProductsModel } from "../DAO/models/products.models.js";

class ProductService {
  async getAll() {
    try {
      const products = await ProductsModel.find({});
      return products;
    } catch (error) {
      throw new Error("products not found.");
    }
  }
  async getOne(pid) {
    try {
      const product = await ProductsModel.findById(pid);
      if (product) {
        return product;
      }
    } catch (error) {
      throw new Error("product not found.");
    }
  }
  async deleteOne(pid) {
    try {
      const productDelete = await ProductsModel.findByIdAndDelete(pid);
      return productDelete;
    } catch (error) {
      throw new Error("product not found.");
    }
  }
  async createOne(body) {
    const { title, description, category, price, code, stock } = body;
    const productExist = await ProductsModel.exists({ code: code });
    if (!title || !description || !category || !price || !code || !stock) {
      throw new Error("all fields are required.");
    } else if (productExist) {
      throw new Error("code alredy exist.");
    }
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
  async updateOne(pid, body) {
    const { title, description, category, price, code, stock } = body;
    if (!title || !description || !category || !price || !code || !stock) {
      throw new Error("all fields are required.");
    }
    const productUpdate = await ProductsModel.updateOne(
      { pid },
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
