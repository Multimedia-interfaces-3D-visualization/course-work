import Express from "express";
import { AnyKeys } from "mongoose";
import Author from "../controllers/author";
import { IBookModel } from "../models/book";


function deleteRedundantInfoInBookObjectAndReturn(data: IBookModel) {
    const book: AnyKeys<IBookModel> = { ...data.toObject() } ;
    delete book.__v;
    book.id = book._id;
    delete book._id;
    return book;
}

const router = Express.Router();

router.get("/books", async (req, res) => {
    try {
        const author = req.query.author;

        if (!author || typeof author !== "string" || author.length < 2) {
            res.status(400).send({ err: "Author is not valid" });
            return;
        }

        const results = await Author.getAllBooksFormAuthor(author);
        if (!results) {
            res.status(404).send({ err: "Books not found" });
            return;
        }

        res.send({ books: results.map(x => deleteRedundantInfoInBookObjectAndReturn(x))});
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/all", async (_, res) => {
    try {
        const results = await Author.getAllAuthors();
        res.send({ authors: results });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

export default router;
