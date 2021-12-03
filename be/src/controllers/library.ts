import { AnyKeys, isValidObjectId } from "mongoose";
import { IBookModel } from "../models/book";
import LibraryModel, { ILibraryModel } from "../models/library";


class Library {
    static async getById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
        const library = await LibraryModel.findById(id);
        return library;
    }

    static async getByNumber(number: number) {
        const library = await LibraryModel.findOne({ number });
        return library;
    }

    static async getAvailableBooksById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
        const library = await LibraryModel.findById(id).populate('availableBooks');
        return library?.availableBooks as IBookModel[] | null | undefined;
    }

    static async create(data: AnyKeys<ILibraryModel>) {
        const library = await new LibraryModel({ ...data }).save();
        return library.id;
    }

    static async getAll() {
        const libraries = await LibraryModel.find();
        return libraries;
    }

    static async deleteById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
        const library = await LibraryModel.findByIdAndDelete(id);
        return library;
    }

    static async deleteByNumber(number: number) {
        const library = await LibraryModel.deleteOne({ number });
        return library;
    }

    static async updateById(id: string, data: AnyKeys<ILibraryModel>) {
        if (!isValidObjectId(id)) {
            return null;
        }
        data.number = undefined;
        const library = await LibraryModel.findByIdAndUpdate(id, { $set: { ...data }}, { runValidators: true });
        return library;
    }

    static async updateByNumber(number: number, data: AnyKeys<ILibraryModel>) {
        data.number = undefined;
        const library = await LibraryModel.updateOne({ number }, { $set: { ...data }}, { runValidators: true });
        return library;
    }
}

export default Library;
