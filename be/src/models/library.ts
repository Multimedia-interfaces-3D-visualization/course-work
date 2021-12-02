import Mongoose from "mongoose";
import idValidator from "mongoose-id-validator";


const AutoIncrement = require('mongoose-sequence')(Mongoose);

export interface ILibraryModel extends Mongoose.Document {
    name: string;
    number: number;
    description?: string;
    address: string;
    schedule?: string;
    telephone: string;
    email: string;
    availableBooks: Mongoose.Types.ObjectId[];
}

const LibraryScheme = new Mongoose.Schema({
    name:           { type: String, required: true },
    number:         { type: Number, unique: true },
    description:    { type: String, required: false },
    address:        { type: String, required: true },
    schedule:       { type: String, required: false },
    telephone:      { type: String, required: true },
    email:          { type: String, required: true },
    availableBooks: { type: [Mongoose.Schema.Types.ObjectId], required: true, default: [], ref: "Book" },
});

LibraryScheme.plugin(idValidator);
LibraryScheme.plugin(AutoIncrement, { id: 'library_seq', inc_field: 'number' });

const LibraryModel = Mongoose.model<ILibraryModel>("Library", LibraryScheme);

export default LibraryModel;
