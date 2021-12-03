import BookModel from "../models/book";


class Author {
    static async getAllAuthors() {
        const books = await BookModel.find();
        const authors = books.map(x => x.authors).flat();
        const uniqueAuthors = [ ...new Set(authors) ];
        return uniqueAuthors;
    }

    static async getAllBooksFormAuthor(author: string) {
        const books = await BookModel.find();
        const authorTrimmed = author.toLowerCase().trim();

        const booksFiltered = books.filter(x => x.authors.some(y => y.toLowerCase().trim().includes(authorTrimmed)));
        return booksFiltered;
    }
}

export default Author;
