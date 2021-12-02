import { AnyKeys, isValidObjectId } from "mongoose";
import CatalogueModel, { ICatalogueModel } from "../models/catalogue";


class Catalogue {
    static async getById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
        const catalogue = await CatalogueModel.findById(id);
        return catalogue;
    }

    static async getByNumber(number: number) {
        const catalogue = await CatalogueModel.findOne({ number });
        return catalogue;
    }

    static async create(data: AnyKeys<ICatalogueModel>) {
        const catalogue = await new CatalogueModel({ ...data }).save();
        return catalogue.id;
    }

    static async getAll() {
        const catalogues = await CatalogueModel.find();
        return catalogues;
    }

    static async deleteById(id: string) {
        if (!isValidObjectId(id)) {
            return null;
        }
        const catalogue = await CatalogueModel.findByIdAndDelete(id);
        return catalogue;
    }

    static async deleteByNumber(number: number) {
        const catalogue = await CatalogueModel.deleteOne({ number });
        return catalogue;
    }

    static async updateById(id: string, data: AnyKeys<ICatalogueModel>) {
        if (!isValidObjectId(id)) {
            return null;
        }
        data.number = undefined;
        const catalogue = await CatalogueModel.findByIdAndUpdate(id, { $set: { ...data }}, { runValidators: true });
        return catalogue;
    }

    static async updateByNumber(number: number, data: AnyKeys<ICatalogueModel>) {
        data.number = undefined;
        const catalogue = await CatalogueModel.updateOne({ number }, { $set: { ...data }}, { runValidators: true });
        return catalogue;
    }
}

export default Catalogue;
