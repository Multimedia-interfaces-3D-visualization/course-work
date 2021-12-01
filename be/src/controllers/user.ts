import { AnyKeys, isValidObjectId } from "mongoose";
import UserModel, { IUserModel } from "../models/user";


class User {
    static async getById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
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

    static async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }

    static async deleteUserById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
        const user = await UserModel.findByIdAndDelete(id);
        return user;
    }

    static async deleteUserByUsername(username: string) {
        const user = await UserModel.deleteOne({ username });
        return user;
    }

    static async updateUserById(id: string, data: AnyKeys<IUserModel>) {
        if (!isValidObjectId(id)) {
            return null;
        }
        data.registrationDate = undefined;
        data.hashedPassword = undefined;
        data.username = undefined;
        const user = await UserModel.findByIdAndUpdate(id, { $set: { ...data }});
        return user;
    }

    static async updateUserByUsername(username: string, data: AnyKeys<IUserModel>) {
        data.registrationDate = undefined;
        data.hashedPassword = undefined;
        data.username = undefined;
        const user = await UserModel.updateOne({ username }, { $set: { ...data }});
        return user;
    }
}

export default User;
