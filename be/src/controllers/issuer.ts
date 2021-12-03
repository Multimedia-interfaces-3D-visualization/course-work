import BookModel from "../models/book";


class Issuer {
    static async getAllIssuers() {
        const books = await BookModel.find();
        const issuers = books.map(x => x.issuer);
        const uniqueIssuers = [ ...new Set(issuers) ];
        return uniqueIssuers;
    }

    static async getAllBooksFormIssuer(issuer: string) {
        const books = await BookModel.find();
        const issuerTrimmed = issuer.toLowerCase().trim();

        const booksFiltered = books.filter(x => x.issuer.toLowerCase().trim().includes(issuerTrimmed));
        return booksFiltered;
    }
}

export default Issuer;
