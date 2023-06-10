import { UserModel } from "../DAO/models/users.models.js";

class UserService {
  async validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      throw new Error("validation error: all fields are required.");
    }
  }

  async getAll() {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (error) {
      throw new Error("users not found.");
    }
  }

  async getOne(uid) {
    try {
      const user = await UserModel.findById(uid);
      console.log(user);
      if (user) {
        return user;
      }
    } catch (error) {
      throw new Error("user not found.");
    }
  }

  async createOne(body) {
    const { firstName, lastName, email } = body;
    this.validateUser(firstName, lastName, email);
    const userCreated = await UserModel.create({
      firstName,
      lastName,
      email,
    });
    return userCreated;
  }

  async deleteOne(uid) {
    try {
      const deleteUser = await UserModel.findByIdAndDelete(uid);
      if (deleteUser) {
        return deleteUser;
      }
    } catch (error) {
      throw new Error("user not found.");
    }
  }

  //aca hay un error!!!!!!!!
  async updateOne(uid, body) {
    //try {
    const { firstName, lastName, email } = body;
    await this.validateUser(firstName, lastName, email);
    const userUpdated = await UserModel.updateOne(
      { _id: uid },
      { firstName, lastName, email }
    );
    return userUpdated;
    /*  } catch (error) {
      throw new Error("user not found bro.");
    } */
  }
}

export const userService = new UserService();
