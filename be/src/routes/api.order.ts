import Express from "express";
import { AnyKeys } from "mongoose";
import { authorize, authorizeAdmin, authorizeVisitor } from "../configs/auth";
import Order from "../controllers/order";
import { IOrderModel } from "../models/order";


function deleteRedundantInfoInObjectAndReturn(data: IOrderModel) {
    const order: AnyKeys<IOrderModel> = { ...data.toObject() } ;
    delete order.__v;
    order.id = order._id;
    delete order._id;
    return order;
}

const router = Express.Router();

// TODO check if needed authorizeVisitor
router.post("/add", authorize, async (req, res) => {
    if (!req.body) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }

    try {
        const id = await Order.create({
            book: req.body.book,
            borrower: req.user?.id,
            dateCreated: Date.now(),
            libraryOwner: req.body.libraryOwner,
            type: req.body.type,
        });
        res.status(201).send({ id });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/n/:number(\\d+)", authorize, async (req, res) => {
    try {
        if (!req.user) {
            res.status(500).send({ err: "Couldn't get user info" });
            return;
        }

        const number = Number.parseInt(req.params.number, 10);
        const result = await Order.getByNumber(number);
        if (!result) {
            res.status(404).send({ err: "Order not found" });
            return;
        }

        if (req.user.role === "visitor" && result.borrower.toString() !== req.user.id.toString()) {
            res.status(403).send({ err: "Forbidden. Visitors can see only own orders" });
            return;
        }

        const order = deleteRedundantInfoInObjectAndReturn(result);
        res.send({ order });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/id/:id", authorize, async (req, res) => {
    try {
        if (!req.user) {
            res.status(500).send({ err: "Couldn't get user info" });
            return;
        }

        const id = req.params.id;
        const result = await Order.getById(id);
        if (!result) {
            res.status(404).send({ err: "Order not found" });
            return;
        }

        if (req.user.role === "visitor" && result.borrower.toString() !== req.user.id.toString()) {
            res.status(403).send({ err: "Forbidden. Visitors can see only own orders" });
            return;
        }

        const order = deleteRedundantInfoInObjectAndReturn(result);
        res.send({ order });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/all/", authorize, async (req, res) => {
    try {
        if (!req.user) {
            res.status(500).send({ err: "Couldn't get user info" });
            return;
        }

        let results = await Order.getAll();
        
        if (req.user.role === "visitor") {
            results = results.filter(x => x.borrower.toString() === req.user?.id?.toString());
        }

        const orders = results.map(x => deleteRedundantInfoInObjectAndReturn(x));
        res.send({ orders });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.put("/id/:id", authorize, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ err: "Invalid request data in body" });
            return;
        }
        if (!req.user) {
            res.status(500).send({ err: "Couldn't get user info" });
            return;
        }

        const id = req.params.id;
        const order = await Order.getById(id);
        if (!order) {
            res.status(404).send({ err: "Order not found" });
            return;
        }

        if (req.user.role === "visitor" && order.borrower.toString() !== req.user.id.toString()) {
            res.status(403).send({ err: "Forbidden. Visitors can edit only own orders" });
            return;
        }

        let objToUpd: AnyKeys<IOrderModel>;

        if (req.user.role === "visitor") {
            objToUpd = {
                book: req.body.book,
                libraryOwner: req.body.libraryOwner,
                type: req.body.type,
            };
        } else {
            objToUpd = {
                book: req.body.book,
                // borrower: req.user?.id,
                libraryOwner: req.body.libraryOwner,
                type: req.body.type,
                isReadyToTake: req.body.isReadyToTake,
                takenDate: req.body.takenDate,
                returnDeadlineDate: req.body.returnDeadlineDate,
                broughtDate: req.body.broughtDate,
            };
        }

        const result = await Order.updateById(id, objToUpd);
        if (!result) {
            res.status(500).send({ err: "Failed to update order" });
            return;
        }
    
        const updatedOrder = deleteRedundantInfoInObjectAndReturn(result);
        res.send({ order: updatedOrder });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

// TODO check if needed authorizeAdmin
router.delete("/id/:id", authorize, async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.getById(id);
        if (!order) {
            res.status(404).send({ err: "Order not found" });
            return;
        }

        const result = await Order.deleteById(id);
        if (!result) {
            res.status(500).send({ err: "Failed to delete order" });
            return;
        }

        const deletedOrder = deleteRedundantInfoInObjectAndReturn(result);
        res.send({ order: deletedOrder });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

export default router;
