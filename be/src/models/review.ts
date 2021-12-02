import Mongoose from "mongoose";
import idValidator from "mongoose-id-validator";


export interface IReviewModel extends Mongoose.Document {
    reviewer: Mongoose.Types.ObjectId;
    book: Mongoose.Types.ObjectId;
    dateCreated: Date;
    starsCount: number;
    title: string;
    description?: string;
}

const ReviewScheme = new Mongoose.Schema({
    reviewer:    { type: Mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    book:        { type: Mongoose.Schema.Types.ObjectId, required: true, ref: "Book" },
    dateCreated: { type: Date, required: true, default: Date.now() },
    starsCount:  { type: Number, required: true, min: 1, max: 5 },
    title:       { type: String, required: true },
    description: { type: String, required: false },
});

ReviewScheme.plugin(idValidator);

const ReviewModel = Mongoose.model<IReviewModel>("Review", ReviewScheme);

export default ReviewModel;
