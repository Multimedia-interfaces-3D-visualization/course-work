import { AnyKeys, isValidObjectId } from "mongoose";
import BookModel, { IBookModel } from "../models/book";


class Book {
    static async getById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
        const book = await BookModel.findById(id);
        return book;
    }

    static async getByISBN(ISBN: number) {
        const book = await BookModel.findOne({ ISBN });
        return book;
    }

    static async create(data: AnyKeys<IBookModel>) {
        const book = await new BookModel({ ...data }).save();
        return book.id;
    }

    static async getAll() {
        const books = await BookModel.find();
        return books;
    }

    static async deleteById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
        const book = await BookModel.findByIdAndDelete(id);
        return book;
    }

    static async updateById(id: string, data: AnyKeys<IBookModel>) {
        if (!isValidObjectId(id)) {
            return null;
        }
        data.ISBN = undefined;
        const book = await BookModel.findByIdAndUpdate(id, { $set: { ...data }}, { runValidators: true });
        return book;
    }
}

export default Book;
