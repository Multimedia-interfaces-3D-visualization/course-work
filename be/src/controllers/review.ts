import { AnyKeys, isValidObjectId } from "mongoose";
import ReviewModel, { IReviewModel } from "../models/review";


class Review {
    static async getById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
        const review = await ReviewModel.findById(id);
        return review;
    }

    static async getForBook(idBook: string) {
        if (!isValidObjectId(idBook)) {
            return null;
        }
        const reviews = await ReviewModel.find({ book: idBook });
        return reviews;
    }

    static async getFromUser(idUser: string) {
        if (!isValidObjectId(idUser)) {
            return null;
        }
        const reviews = await ReviewModel.find({ reviewer: idUser });
        return reviews;
    }

    static async create(data: AnyKeys<IReviewModel>) {
        const review = await new ReviewModel({ ...data }).save();
        return review.id;
    }

    static async getAll() {
        const reviews = await ReviewModel.find();
        return reviews;
    }

    static async deleteById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
        const review = await ReviewModel.findByIdAndDelete(id);
        return review;
    }

    static async updateById(id: string, data: AnyKeys<IReviewModel>) {
        if (!isValidObjectId(id)) {
            return null;
        }
        data.dateCreated = undefined;
        const review = await ReviewModel.findByIdAndUpdate(id, { $set: { ...data }}, { runValidators: true });
        return review;
    }
}

export default Review;
