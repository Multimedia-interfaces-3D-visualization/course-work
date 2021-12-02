import Mongoose from "mongoose";


const AutoIncrement = require('mongoose-sequence')(Mongoose);

export interface ICatalogueModel extends Mongoose.Document {
    number: number;
    name: string;
    description?: string;
    parentCatalogue?: Mongoose.Types.ObjectId;
    childCatalogues: Mongoose.Types.ObjectId[];
    tags: string[];
    books: Mongoose.Types.ObjectId[];
}

const CatalogueScheme = new Mongoose.Schema({
    number:          { type: Number, required: true, unique: true },
    name:            { type: String, required: true },
    description:     { type: String, required: false },
    parentCatalogue: { type: Mongoose.Schema.Types.ObjectId, required: false, ref: "Catalogue" },
    childCatalogues: { type: [Mongoose.Schema.Types.ObjectId], required: true, ref: "Catalogue" },
    tags:            { type: [String], required: true },
    books:           { type: [Mongoose.Schema.Types.ObjectId], required: true, ref: "Book" },
});

CatalogueScheme.plugin(AutoIncrement, { inc_field: 'number' });

const CatalogueModel = Mongoose.model<ICatalogueModel>("Catalogue", CatalogueScheme);

export default CatalogueModel;
