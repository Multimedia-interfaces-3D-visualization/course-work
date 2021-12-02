import Mongoose from "mongoose";


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
    number:         { type: Number, required: true, unique: true },
    description:    { type: String, required: false },
    address:        { type: String, required: true },
    schedule:       { type: String, required: false },
    telephone:      { type: String, required: true },
    email:          { type: String, required: true },
    availableBooks: { type: [Mongoose.Schema.Types.ObjectId], required: true, ref: "Book" },
});

LibraryScheme.plugin(AutoIncrement, { inc_field: 'number' });

const LibraryModel = Mongoose.model<ILibraryModel>("Library", LibraryScheme);

export default LibraryModel;
