import Mongoose from "mongoose";


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

const BookModel = Mongoose.model<IBookModel>("Book", BookScheme);

export default BookModel;
