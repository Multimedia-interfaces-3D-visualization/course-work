import { AnyKeys } from "mongoose";
import UserModel, { IUserModel } from "../models/user";


class User {
    static async getById(id: string) {
        const user = await UserModel.findById(id);
        return user;
    }

    static async getByUsername(username: string) {
        const user = await UserModel.findOne({ username });
        return user;
    }

    static async create(data: AnyKeys<IUserModel>) {
        const user = await new UserModel({ ...data }).save();
        return user.id;
    }
}

export default User;
