import Mongoose from "mongoose";
import idValidator from "mongoose-id-validator";


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
    number:          { type: Number, unique: true },
    name:            { type: String, required: true },
    description:     { type: String, required: false },
    parentCatalogue: { type: Mongoose.Schema.Types.ObjectId, required: false, ref: "Catalogue" },
    childCatalogues: { type: [Mongoose.Schema.Types.ObjectId], required: true, default: [], ref: "Catalogue" },
    tags:            { type: [String], required: true, default: [] },
    books:           { type: [Mongoose.Schema.Types.ObjectId], required: true, default: [], ref: "Book" },
});

CatalogueScheme.pre('findOneAndDelete', async function(next) {
    const id = this.getQuery()['_id'];
    const resParent = await CatalogueModel.findOne({ parentCatalogue: id });
    if (resParent) {
        throw new Error(`There is a parent catalogue ${resParent.id}, which refers to this catalogue`);
    }

    const res = await CatalogueModel.findOne({ childCatalogues: id });
    if (res) {
        throw new Error(`There is a child catalogue ${res.id}, which refers to this catalogue`);
    }

    next();
});

CatalogueScheme.plugin(idValidator);
CatalogueScheme.plugin(AutoIncrement, { id: 'catalogue_seq', inc_field: 'number' });

const CatalogueModel = Mongoose.model<ICatalogueModel>("Catalogue", CatalogueScheme);

export default CatalogueModel;
