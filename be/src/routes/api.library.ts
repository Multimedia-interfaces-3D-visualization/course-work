import Express from "express";
import { AnyKeys, isValidObjectId } from "mongoose";
import { authorize, authorizeAdmin } from "../configs/auth";
import Library from "../controllers/library";
import Order from "../controllers/order";
import { IBookModel } from "../models/book";
import { ILibraryModel } from "../models/library";
import { IOrderModel } from "../models/order";


function deleteRedudantInfoInLibraryObjectAndReturn(data: ILibraryModel) {
    const library: AnyKeys<ILibraryModel> = { ...data.toObject() } ;
    delete library.__v;
    library.id = library._id;
    delete library._id;
    return library;
}

function deleteRedundantInfoInBookObjectAndReturn(data: IBookModel) {
    const book: AnyKeys<IBookModel> = { ...data.toObject() } ;
    delete book.__v;
    book.id = book._id;
    delete book._id;
    return book;
}

function deleteRedundantInfoInOrderObjectAndReturn(data: IOrderModel) {
    const order: AnyKeys<IOrderModel> = { ...data.toObject() } ;
    delete order.__v;
    order.id = order._id;
    delete order._id;
    return order;
}

const router = Express.Router();

router.post("/add", authorize, authorizeAdmin, async (req, res) => {
    if (!req.body) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }

    const requiredFields = [
        { name: "name", minLength: 5 },
        { name: "address", minLength: 5 },
        { name: "telephone", minLength: 3 },
        { name: "email", minLength: 3 },
    ];

    const nonRequiredFields = [
        { name: "description", minLength: 5 },
        { name: "schedule", minLength: 5 },
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
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
        return;
    }

    try {
        const id = await Library.create({
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            schedule: req.body.schedule,
            telephone: req.body.telephone,
            email: req.body.email,
        });
        res.status(201).send({ id });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/n/:number(\\d+)", async (req, res) => {
    try {
        const number = Number.parseInt(req.params.number, 10);;
        const result = await Library.getByNumber(number);
        if (!result) {
            res.status(404).send({ err: "Library not found" });
            return;
        }

        const library = deleteRedudantInfoInLibraryObjectAndReturn(result);
        res.send({ library });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Library.getById(id);
        if (!result) {
            res.status(404).send({ err: "Library not found" });
            return;
        }

        const library = deleteRedudantInfoInLibraryObjectAndReturn(result);
        res.send({ library });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/all/", async (_, res) => {
    try {
        const results = await Library.getAll();
        const libraries = results.map(x => deleteRedudantInfoInLibraryObjectAndReturn(x));
        res.send({ libraries });
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
        const library = await Library.getById(id);
        if (!library) {
            res.status(404).send({ err: "Library not found" });
            return;
        }
 
        const nonRequiredFields = [
            { name: "name", minLength: 5 },
            { name: "address", minLength: 5 },
            { name: "telephone", minLength: 3 },
            { name: "email", minLength: 3 },
            { name: "description", minLength: 5 },
            { name: "schedule", minLength: 5 },
        ];
        for (const nonReqField of nonRequiredFields) {
            const fieldValue = req.body[nonReqField.name];
            if (fieldValue && fieldValue.length < nonReqField.minLength) {
                res.status(400).send({ err: `Not required value '${nonReqField.name}', expected min length: ${nonReqField.minLength}` });
                return;
            }
        }
        if (req.body.availableBooks &&
            (!Array.isArray(req.body.availableBooks)
                || (req.body.availableBooks as []).some(x => typeof x !== "string" || !isValidObjectId(x)))) {
            res.status(400).send({ err: `availableBooks is invalid, expected array of books' IDs` });
            return;
        }

        const result = await Library.updateById(id, {
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            schedule: req.body.schedule,
            telephone: req.body.telephone,
            email: req.body.email,
            availableBooks: req.body.availableBooks
        });
        if (!result) {
            res.status(500).send({ err: "Failed to update library" });
            return;
        }
    

        const updatedLibrary = deleteRedudantInfoInLibraryObjectAndReturn(result);
        res.send({ library: updatedLibrary });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.put("/availableBooks/add/:id", authorize, authorizeAdmin, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ err: "Invalid request data in body" });
            return;
        }
        const id = req.params.id;
        const library = await Library.getById(id);
        if (!library) {
            res.status(404).send({ err: "Library not found" });
            return;
        }

        if (!Array.isArray(req.body.availableBooks)
                || (req.body.availableBooks as []).some(x => typeof x !== "string" || !isValidObjectId(x))) {
            res.status(400).send({ err: `availableBooks is invalid, expected array of books' IDs` });
            return;
        }

        const result = await Library.updateById(id, {
            availableBooks: [ ...library.availableBooks, ...req.body.availableBooks]
        });
        if (!result) {
            res.status(500).send({ err: "Failed to update library" });
            return;
        }
    

        const updatedLibrary = deleteRedudantInfoInLibraryObjectAndReturn(result);
        res.send({ library: updatedLibrary });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.put("/availableBooks/remove/:id", authorize, authorizeAdmin, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ err: "Invalid request data in body" });
            return;
        }
        const id = req.params.id;
        const library = await Library.getById(id);
        if (!library) {
            res.status(404).send({ err: "Library not found" });
            return;
        }

        if (!Array.isArray(req.body.availableBooks)
                || (req.body.availableBooks as []).some(x => typeof x !== "string" || !isValidObjectId(x))) {
            res.status(400).send({ err: `availableBooks is invalid, expected array of books' IDs` });
            return;
        }

        const newAvailableBooks = library.availableBooks.filter(x => (req.body.availableBooks as []).every(y => x.toString() !== y));

        const result = await Library.updateById(id, {
            availableBooks: [ ...newAvailableBooks ]
        });
        if (!result) {
            res.status(500).send({ err: "Failed to update library" });
            return;
        }
    

        const updatedLibrary = deleteRedudantInfoInLibraryObjectAndReturn(result);
        res.send({ library: updatedLibrary });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.delete("/id/:id", authorize, authorizeAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const library = await Library.getById(id);
        if (!library) {
            res.status(404).send({ err: "Library not found" });
            return;
        }

        const result = await Library.deleteById(id);
        if (!result) {
            res.status(500).send({ err: "Failed to delete library" });
            return;
        }

        const deletedLibrary = deleteRedudantInfoInLibraryObjectAndReturn(result);
        res.send({ library: deletedLibrary });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/availableBooks/id/:id", async (req, res) => {
    const id = req.params.id;
    const library = await Library.getById(id);
    if (!library) {
        res.status(404).send({ err: "Library not found" });
        return;
    }

    const results = await Library.getAvailableBooksById(id);

    const filteredBooks = results?.map(x => deleteRedundantInfoInBookObjectAndReturn(x));
    res.send({ books: filteredBooks });
});

router.get("/assignedOrders/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Library.getById(id);
        if (!result) {
            res.status(404).send({ err: "Library not found" });
            return;
        }

        const results = await Order.getForLibrary(id);

        const filteredLibraries = results?.map(x => deleteRedundantInfoInOrderObjectAndReturn(x));
        res.send({ libraries: filteredLibraries });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});


export default router;
