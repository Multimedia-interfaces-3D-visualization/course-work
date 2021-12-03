import { AnyKeys, isValidObjectId } from "mongoose";
import OrderModel, { IOrderModel } from "../models/order";


class Order {
    static async getById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
        const order = await OrderModel.findById(id);
        return order;
    }

    static async getByNumber(number: number) {
        const order = await OrderModel.findOne({ number });
        return order;
    }

    static async getFromUser(idUser: string) {
        if (!isValidObjectId(idUser)) {
            return null;
        }
        const orders = await OrderModel.find({ borrower: idUser });
        return orders;
    }

    static async getForLibrary(idLibrary: string) {
        if (!isValidObjectId(idLibrary)) {
            return null;
        }
        const orders = await OrderModel.find({ libraryOwner: idLibrary });
        return orders;
    }

    static async create(data: AnyKeys<IOrderModel>) {
        const order = await new OrderModel({ ...data }).save();
        return order.id;
    }

    static async getAll() {
        const orders = await OrderModel.find();
        return orders;
    }

    static async deleteById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
        const order = await OrderModel.findByIdAndDelete(id);
        return order;
    }

    static async updateById(id: string, data: AnyKeys<IOrderModel>) {
        if (!isValidObjectId(id)) {
            return null;
        }
        data.number = undefined;
        data.dateCreated = undefined;
        const order = await OrderModel.findByIdAndUpdate(id, { $set: { ...data }}, { runValidators: true });
        return order;
    }
}

export default Order;
