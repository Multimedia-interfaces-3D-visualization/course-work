import Mongoose from "mongoose";
import CatalogueModel from "./catalogue";
import LibraryModel from "./library";
import OrderModel from "./order";
import ReviewModel from "./review";


export interface IBookModel extends Mongoose.Document {
    ISBN: number;
    UDC?: string;
    name: string;
    abstract?: string;
    authors: string[];
    yearPublished: number;
    placePublished: string;
    issuer: string;
    countPages?: number;
    keywords: string[];
    languageISO?: string;
    type: string;
    imageURL?: string;
    dateAdded: Date;
}

const BookScheme = new Mongoose.Schema({
    ISBN:           { type: Number, required: true, unique: true },
    UDC:            { type: String, required: false },
    name:           { type: String, required: true },
    abstract:       { type: String, required: false },
    authors:        { type: [String], required: true },
    yearPublished:  { type: Number, required: true },
    placePublished: { type: String, required: true },
    issuer:         { type: String, required: true },
    countPages:     { type: Number, required: false },
    keywords:       { type: [String], required: true, default: [] },
    languageISO:    { type: String, required: false },
    type:           { type: String, required: true },
    imageURL:       { type: String, required: false },
    dateAdded:      { type: Date, required: true, default: Date.now() },
});

BookScheme.pre('findOneAndDelete', async function(next) {
    const id = this.getQuery()['_id'];
    const resCatalogue = await CatalogueModel.findOne({ books: id });
    if (resCatalogue) {
        throw new Error(`There is a catalogue ${resCatalogue.id}, which refers to this book`);
    }

    const resLibrary = await LibraryModel.findOne({ availableBooks: id });
    if (resLibrary) {
        throw new Error(`There is a library ${resLibrary.id}, which refers to this book`);
    }

    const resOrder = await OrderModel.findOne({ book: id });
    if (resOrder) {
        throw new Error(`There is an order ${resOrder.id}, which refers to this book`);
    }

    const res = await ReviewModel.findOne({ book: id });
    if (res) {
        throw new Error(`There is a review ${res.id}, which refers to this book`);
    }

    next();
});

const BookModel = Mongoose.model<IBookModel>("Book", BookScheme);

export default BookModel;
