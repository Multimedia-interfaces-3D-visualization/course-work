import Mongoose from "mongoose";


const AutoIncrement = require('mongoose-sequence')(Mongoose);

export type OrderType = "self-pickup" | "shipping";

export interface IOrderModel extends Mongoose.Document {
    number: number;
    book: Mongoose.Types.ObjectId;
    borrower: Mongoose.Types.ObjectId;
    libraryOwner: Mongoose.Types.ObjectId;
    type: OrderType;
    dateCreated: Date;
    isReadyToTake: boolean;
    takenDate?: Date;
    returnDeadlineDate: Date;
    broughtDate?: Date;
}

const OrderScheme = new Mongoose.Schema({
    number:             { type: Number, required: true, unique: true },
    book:               { type: Mongoose.Schema.Types.ObjectId, required: true, ref: "Book" },
    borrower:           { type: Mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    libraryOwner:       { type: Mongoose.Schema.Types.ObjectId, required: true, ref: "Library" },
    type:               { type: String, required: true, enum: [ "self-pickup", "shipping" ] },
    dateCreated:        { type: Date, required: true, default: Date.now() },
    isReadyToTake:      { type: Boolean, required: true, default: false },
    takenDate:          { type: Date, required: false },
    returnDeadlineDate: { type: Date, required: true, default: new Date(new Date().setMonth(new Date().getMonth() + 1)) },
    broughtDate:        { type: Date, required: false },
});

OrderScheme.plugin(AutoIncrement, { inc_field: 'number' });

const OrderModel = Mongoose.model<IOrderModel>("Order", OrderScheme);

export default OrderModel;
