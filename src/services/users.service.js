import { UserModel } from "../DAO/models/users.models.js";

class UserService {
  async getAll() {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (error) {
      throw new Error("users not find.");
    }
  }

  async getOne(uid) {
    try {
      const user = await UserModel.findById(uid);
      if (user) {
        return user;
      }
    } catch (error) {
      throw new Error("user not find.");
    }
  }
}

export const userService = new UserService();
