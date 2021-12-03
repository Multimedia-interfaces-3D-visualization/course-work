import Express from "express";
import { AnyKeys } from "mongoose";
import { authorize, authorizeAdmin } from "../configs/auth";
import Book from "../controllers/book";
import { IBookModel } from "../models/book";


function deleteRedundantInfoInBookObjectAndReturn(data: IBookModel) {
    const book: AnyKeys<IBookModel> = { ...data.toObject() } ;
    delete book.__v;
    book.id = book._id;
    delete book._id;
    return book;
}

const router = Express.Router();

router.post("/add", authorize, authorizeAdmin, async (req, res) => {
    if (!req.body) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }

    try {
        const id = await Book.create({
            ISBN: req.body.ISBN,
            UDC: req.body.UDC,
            name: req.body.name,
            abstract: req.body.abstract,
            authors: req.body.authors,
            yearPublished: req.body.yearPublished,
            placePublished: req.body.placePublished,
            issuer: req.body.issuer,
            countPages: req.body.countPages,
            keywords: req.body.keywords,
            languageISO: req.body.languageISO,
            type: req.body.type,
            imageURL: req.body.imageURL,
        });
        res.status(201).send({ id });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/isbn/:number(\\d+)", async (req, res) => {
    try {
        const number = Number.parseInt(req.params.number, 10);;
        const result = await Book.getByISBN(number);
        if (!result) {
            res.status(404).send({ err: "Book not found" });
            return;
        }

        const book = deleteRedundantInfoInBookObjectAndReturn(result);
        res.send({ book });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Book.getById(id);
        if (!result) {
            res.status(404).send({ err: "Book not found" });
            return;
        }

        const book = deleteRedundantInfoInBookObjectAndReturn(result);
        res.send({ book });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/all/", async (_, res) => {
    try {
        const results = await Book.getAll();
        const books = results.map(x => deleteRedundantInfoInBookObjectAndReturn(x));
        res.send({ books });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.put("/id/:id", authorize, authorizeAdmin, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ err: "Invalid request data in body" });
            return;
        }
        const id = req.params.id;
        const book = await Book.getById(id);
        if (!book) {
            res.status(404).send({ err: "Book not found" });
            return;
        }

        const result = await Book.updateById(id, {
            UDC: req.body.UDC,
            name: req.body.name,
            abstract: req.body.abstract,
            authors: req.body.authors,
            yearPublished: req.body.yearPublished,
            placePublished: req.body.placePublished,
            issuer: req.body.issuer,
            countPages: req.body.countPages,
            keywords: req.body.keywords,
            languageISO: req.body.languageISO,
            type: req.body.type,
            imageURL: req.body.imageURL,
        });
        if (!result) {
            res.status(500).send({ err: "Failed to update book" });
            return;
        }
    

        const updatedBook = deleteRedundantInfoInBookObjectAndReturn(result);
        res.send({ book: updatedBook });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.delete("/id/:id", authorize, authorizeAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.getById(id);
        if (!book) {
            res.status(404).send({ err: "Book not found" });
            return;
        }

        const result = await Book.deleteById(id);
        if (!result) {
            res.status(500).send({ err: "Failed to delete book" });
            return;
        }

        const deletedBook = deleteRedundantInfoInBookObjectAndReturn(result);
        res.send({ book: deletedBook });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

export default router;
