import Express from "express";
import { AnyKeys, isValidObjectId } from "mongoose";
import { authorize, authorizeAdmin } from "../configs/auth";
import Catalogue from "../controllers/catalogue";
import { IBookModel } from "../models/book";
import { ICatalogueModel } from "../models/catalogue";


function deleteRedudantInfoInCatalogueObjectAndReturn(data: ICatalogueModel) {
    const catalogue: AnyKeys<ICatalogueModel> = { ...data.toObject() } ;
    delete catalogue.__v;
    catalogue.id = catalogue._id;
    delete catalogue._id;
    return catalogue;
}

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

    const requiredFields = [
        { name: "name", minLength: 5 },
    ];

    const nonRequiredFields = [
        { name: "description", minLength: 5 },
    ];

    try {

        for (const reqField of requiredFields) {
            const fieldValue = req.body[reqField.name];
            if (!fieldValue || fieldValue.length < reqField.minLength) {
                res.status(400).send({ err: `Required value '${reqField.name}', expected min length: ${reqField.minLength}` });
                return;
            }
        }

        for (const nonReqField of nonRequiredFields) {
            const fieldValue = req.body[nonReqField.name];
            if (fieldValue && fieldValue.length < nonReqField.minLength) {
                res.status(400).send({ err: `Not required value '${nonReqField.name}', expected min length: ${nonReqField.minLength}` });
                return;
            }
        }


        if (req.body.parentCatalogue && !isValidObjectId(req.body.parentCatalogue)) {
            res.status(400).send({ err: `Not required parentCatalogue is invalid, expected ID of catalogue` });
            return;
        }

        if (req.body.childCatalogues &&
            (!Array.isArray(req.body.childCatalogues)
                || (req.body.childCatalogues as []).some(x => typeof x !== "string" || !isValidObjectId(x)))) {
            res.status(400).send({ err: `Not required childCatalogues is invalid, expected array of catalogue' IDs` });
            return;
        }


        if (req.body.tags &&
            (!Array.isArray(req.body.tags) || (req.body.tags as []).some(x => typeof x !== "string"))) {
            res.status(400).send({ err: `Not required tags is invalid, expected array of strings` });
            return;
        }


        if (req.body.books &&
            (!Array.isArray(req.body.books)
                || (req.body.books as []).some(x => typeof x !== "string" || !isValidObjectId(x)))) {
            res.status(400).send({ err: `Not required books is invalid, expected array of books' IDs` });
            return;
        }
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
        return;
    }

    try {
        const id = await Catalogue.create({
            name: req.body.name,
            description: req.body.description,
            parentCatalogue: req.body.parentCatalogue,
            childCatalogues: req.body.childCatalogues,
            tags: req.body.tags,
            books: req.body.books,
        });
        res.status(201).send({ id });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/n/:number(\\d+)", async (req, res) => {
    try {
        const number = Number.parseInt(req.params.number, 10);;
        const result = await Catalogue.getByNumber(number);
        if (!result) {
            res.status(404).send({ err: "Catalogue not found" });
            return;
        }

        const catalogue = deleteRedudantInfoInCatalogueObjectAndReturn(result);
        res.send({ catalogue });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Catalogue.getById(id);
        if (!result) {
            res.status(404).send({ err: "Catalogue not found" });
            return;
        }

        const catalogue = deleteRedudantInfoInCatalogueObjectAndReturn(result);
        res.send({ catalogue });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/all/", async (_, res) => {
    try {
        const results = await Catalogue.getAll();
        const catalogues = results.map(x => deleteRedudantInfoInCatalogueObjectAndReturn(x));
        res.send({ catalogues });
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
        const catalogue = await Catalogue.getById(id);
        if (!catalogue) {
            res.status(404).send({ err: "Catalogue not found" });
            return;
        }

        const nonRequiredFields = [
            { name: "name", minLength: 5 },
            { name: "description", minLength: 5 },
        ];

        for (const nonReqField of nonRequiredFields) {
            const fieldValue = req.body[nonReqField.name];
            if (fieldValue && fieldValue.length < nonReqField.minLength) {
                res.status(400).send({ err: `Not required value '${nonReqField.name}', expected min length: ${nonReqField.minLength}` });
                return;
            }
        }


        if (req.body.parentCatalogue && !isValidObjectId(req.body.parentCatalogue)) {
            res.status(400).send({ err: `Not required parentCatalogue is invalid, expected ID of catalogue` });
            return;
        }

        if (req.body.childCatalogues &&
            (!Array.isArray(req.body.childCatalogues)
                || (req.body.childCatalogues as []).some(x => typeof x !== "string" || !isValidObjectId(x)))) {
            res.status(400).send({ err: `Not required childCatalogues is invalid, expected array of catalogue' IDs` });
            return;
        }


        if (req.body.tags &&
            (!Array.isArray(req.body.tags) || (req.body.tags as []).some(x => typeof x !== "string"))) {
            res.status(400).send({ err: `Not required tags is invalid, expected array of strings` });
            return;
        }


        if (req.body.books &&
            (!Array.isArray(req.body.books)
                || (req.body.books as []).some(x => typeof x !== "string" || !isValidObjectId(x)))) {
            res.status(400).send({ err: `Not required books is invalid, expected array of books' IDs` });
            return;
        }

        const result = await Catalogue.updateById(id, {
            name: req.body.name,
            description: req.body.description,
            parentCatalogue: req.body.parentCatalogue,
            childCatalogues: req.body.childCatalogues,
            tags: req.body.tags,
            books: req.body.books,
        });
        if (!result) {
            res.status(500).send({ err: "Failed to update catalogue" });
            return;
        }
    

        const updatedCatalogue = deleteRedudantInfoInCatalogueObjectAndReturn(result);
        res.send({ catalogue: updatedCatalogue });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.put("/books/add/:id", authorize, authorizeAdmin, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ err: "Invalid request data in body" });
            return;
        }
        const id = req.params.id;
        const catalogue = await Catalogue.getById(id);
        if (!catalogue) {
            res.status(404).send({ err: "Catalogue not found" });
            return;
        }

        if (!Array.isArray(req.body.books)
                || (req.body.books as []).some(x => typeof x !== "string" || !isValidObjectId(x))) {
            res.status(400).send({ err: `Not required books is invalid, expected array of books' IDs` });
            return;
        }

        const result = await Catalogue.updateById(id, {
            books: [ ...catalogue.books, ...req.body.books]
        });
        if (!result) {
            res.status(500).send({ err: "Failed to update catalogue" });
            return;
        }

        const updatedCatalogue = deleteRedudantInfoInCatalogueObjectAndReturn(result);
        res.send({ catalogue: updatedCatalogue });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.put("/books/remove/:id", authorize, authorizeAdmin, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ err: "Invalid request data in body" });
            return;
        }
        const id = req.params.id;
        const catalogue = await Catalogue.getById(id);
        if (!catalogue) {
            res.status(404).send({ err: "Catalogue not found" });
            return;
        }

        if (!Array.isArray(req.body.books)
                || (req.body.books as []).some(x => typeof x !== "string" || !isValidObjectId(x))) {
            res.status(400).send({ err: `Not required books is invalid, expected array of books' IDs` });
            return;
        }

        const newBooks = catalogue.books.filter(x => (req.body.books as []).every(y => x.toString() !== y));

        const result = await Catalogue.updateById(id, {
            books: [ ...newBooks ]
        });
        if (!result) {
            res.status(500).send({ err: "Failed to update catalogue" });
            return;
        }
    

        const updatedCatalogue = deleteRedudantInfoInCatalogueObjectAndReturn(result);
        res.send({ catalogue: updatedCatalogue });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.put("/childCatalogues/add/:id", authorize, authorizeAdmin, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ err: "Invalid request data in body" });
            return;
        }
        const id = req.params.id;
        const catalogue = await Catalogue.getById(id);
        if (!catalogue) {
            res.status(404).send({ err: "Catalogue not found" });
            return;
        }

        if (!Array.isArray(req.body.childCatalogues)
                || (req.body.childCatalogues as []).some(x => typeof x !== "string" || !isValidObjectId(x))) {
            res.status(400).send({ err: `Not required childCatalogues is invalid, expected array of catalogue' IDs` });
            return;
        }

        const result = await Catalogue.updateById(id, {
            childCatalogues: [ ...catalogue.childCatalogues, ...req.body.childCatalogues]
        });
        if (!result) {
            res.status(500).send({ err: "Failed to update catalogue" });
            return;
        }

        //
        for (const childCatalogId of req.body.childCatalogues) {
            await Catalogue.updateById(childCatalogId, { parentCatalogue: id });
        }

        const updatedCatalogue = deleteRedudantInfoInCatalogueObjectAndReturn(result);
        res.send({ catalogue: updatedCatalogue });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.put("/childCatalogues/remove/:id", authorize, authorizeAdmin, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ err: "Invalid request data in body" });
            return;
        }
        const id = req.params.id;
        const catalogue = await Catalogue.getById(id);
        if (!catalogue) {
            res.status(404).send({ err: "Catalogue not found" });
            return;
        }

        if (!Array.isArray(req.body.childCatalogues)
                || (req.body.childCatalogues as []).some(x => typeof x !== "string" || !isValidObjectId(x))) {
            res.status(400).send({ err: `Not required childCatalogues is invalid, expected array of catalogue' IDs` });
            return;
        }

        const newChildCatalogues = catalogue.childCatalogues.filter(x => (req.body.childCatalogues as []).every(y => x.toString() !== y));

        const result = await Catalogue.updateById(id, {
            childCatalogues: [ ...newChildCatalogues ]
        });
        if (!result) {
            res.status(500).send({ err: "Failed to update catalogue" });
            return;
        }

        //
        for (const childCatalogId of req.body.childCatalogues) {
            await Catalogue.updateById(childCatalogId, { parentCatalogue: null });
        }

        const updatedCatalogue = deleteRedudantInfoInCatalogueObjectAndReturn(result);
        res.send({ catalogue: updatedCatalogue });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.delete("/id/:id", authorize, authorizeAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const catalogue = await Catalogue.getById(id);
        if (!catalogue) {
            res.status(404).send({ err: "Catalogue not found" });
            return;
        }

        const result = await Catalogue.deleteById(id);
        if (!result) {
            res.status(500).send({ err: "Failed to delete catalogue" });
            return;
        }

        const deletedCatalogue = deleteRedudantInfoInCatalogueObjectAndReturn(result);
        res.send({ catalogue: deletedCatalogue });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/allBooks/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Catalogue.getById(id);
        if (!result) {
            res.status(404).send({ err: "Catalogue not found" });
            return;
        }

        const books = await Catalogue.getAllBooks(id);

        const booksFiltered = books?.map(x => deleteRedundantInfoInBookObjectAndReturn(x));
        res.send({ books: booksFiltered });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/allBooksRecursive/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Catalogue.getById(id);
        if (!result) {
            res.status(404).send({ err: "Catalogue not found" });
            return;
        }

        const books = await Catalogue.getAllBooksRecursive(id);

        const booksFiltered = books?.map(x => deleteRedundantInfoInBookObjectAndReturn(x));
        res.send({ books: booksFiltered });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

export default router;
