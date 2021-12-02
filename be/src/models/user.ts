import Mongoose from "mongoose";
import OrderModel from "./order";
import ReviewModel from "./review";

export type UserRole = "visitor" | "admin";

export interface IUserModel extends Mongoose.Document {
    username: string;
    hashedPassword: string;
    firstName: string;
    surname: string;
    lastName?: string;
    registrationDate: Date;
    role: UserRole;
    postalAddress?: string;
    postcode?: string;
}

const UserScheme = new Mongoose.Schema({
    username:         { type: String, required: true, unique: true },
    hashedPassword:   { type: String, required: true },
    firstName:        { type: String, required: true },
    surname:          { type: String, required: true },
    lastName:         { type: String, required: false },
    registrationDate: { type: Date,   required: true, default: Date.now() },
    role:             { type: String, required: true, default: "visitor", enum: [ "visitor", "admin" ] },
    postalAddress:    { type: String, required: false },
    postcode:         { type: String, required: false },
});

UserScheme.pre('findOneAndDelete', async function(next) {
    const id = this.getQuery()['_id'];
    const res = await ReviewModel.findOne({ reviewer: id });
    if (res) {
        throw new Error(`There is a review ${res.id}, which refers to this user`);
    }
    const resOrder = await OrderModel.findOne({ borrower: id });
    if (resOrder) {
        throw new Error(`There is an order ${resOrder.id}, which refers to this user`);
    }

    next();
});

const UserModel = Mongoose.model<IUserModel>("User", UserScheme);

export default UserModel;
