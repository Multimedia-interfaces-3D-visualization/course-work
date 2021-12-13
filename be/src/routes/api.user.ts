import Express from "express";
import { AnyKeys } from "mongoose";
import { authorize, authorizeAdmin } from "../configs/auth";
import Order from "../controllers/order";
import User from "../controllers/user";
import { IOrderModel } from "../models/order";
import { IUserModel } from "../models/user";


function deleteSensetiveInfoInUserObjectAndReturn(data: IUserModel) {
    const user: AnyKeys<IUserModel> = { ...data.toObject() } ;
    delete user.hashedPassword;
    delete user.__v;
    user.id = user._id;
    delete user._id;
    return user;
}

function deleteRedundantInfoInOrderObjectAndReturn(data: IOrderModel) {
    const order: AnyKeys<IOrderModel> = { ...data.toObject() } ;
    delete order.__v;
    order.id = order._id;
    delete order._id;
    return order;
}

const router = Express.Router();

router.get("/u/:username", authorize, authorizeAdmin, async (req, res) => {
    try {
        const username = req.params.username;
        const result = await User.getByUsername(username);
        if (!result) {
            res.status(404).send({ err: "User not found" });
            return;
        }

        const user = deleteSensetiveInfoInUserObjectAndReturn(result);
        res.send({ user });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

// TODO authorizeAdmin check user
router.get("/id/:id", authorize, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.getById(id);
        if (!result) {
            res.status(404).send({ err: "User not found" });
            return;
        }

        const user = deleteSensetiveInfoInUserObjectAndReturn(result);
        res.send({ user });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

// TODO authorizeAdmin check user
router.get("/all/", authorize, async (_, res) => {
    try {
        const results = await User.getAllUsers();
        const users = results.map(x => deleteSensetiveInfoInUserObjectAndReturn(x));
        res.send({ users });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/me", authorize, async (req, res) => {
    if (!req.user) {
        res.status(500).send({ err: "Couldn't retrieve user obj" })
        return;
    }
    
    const user = deleteSensetiveInfoInUserObjectAndReturn(req.user);
    res.send({ user });
});

router.put("/me", authorize, async (req, res) => {
    try {
        if (!req.user) {
            res.status(500).send({ err: "Couldn't retrieve user obj" })
            return;
        }
        if (!req.body) {
            res.status(400).send({ err: "Invalid request data in body" });
            return;
        }
 
        const nonRequiredFields = [
            { name: "lastName", minLength: 2 },
            { name: "firstName", minLength: 2 },
            { name: "surname", minLength: 2 },
            { name: "postalAddress", minLength: 5 },
            { name: "postcode", minLength: 5 },
        ];
        for (const nonReqField of nonRequiredFields) {
            const fieldValue = req.body[nonReqField.name];
            if (fieldValue && fieldValue.length < nonReqField.minLength) {
                res.status(400).send({ err: `Not required value '${nonReqField.name}', expected min length: ${nonReqField.minLength}` });
                return;
            }
        }

        const result = await User.updateUserById(req.user.id, {
            firstName: req.body.firstName,
            surname: req.body.surname,
            lastName: req.body.lastName,
            postalAddress: req.body.postalAddress,
            postcode: req.body.postcode,
        });
        if (!result) {
            res.status(500).send({ err: "Failed to update user" });
            return;
        }
    

        const updatedUser = deleteSensetiveInfoInUserObjectAndReturn(result);
        res.send({ user: updatedUser });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.put("/role/:id", authorize, authorizeAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const isAdmin = req.query.setAdmin;
        const user = await User.getById(id);
        if (!user) {
            res.status(404).send({ err: "User not found" });
            return;
        }

        const result = await User.updateUserById(id, {
            role: isAdmin === "true" ? "admin" : "visitor"
        });
        if (!result) {
            res.status(500).send({ err: "Failed to update user role" });
            return;
        }

        const updatedUser = deleteSensetiveInfoInUserObjectAndReturn(result);
        res.send({ user: updatedUser });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.delete("/me", authorize, async (req, res) => {
    try {
        if (!req.user) {
            res.status(500).send({ err: "Couldn't retrieve user obj" })
            return;
        }

        const result = await User.deleteUserById(req.user.id);
        if (!result) {
            res.status(500).send({ err: "Failed to delete user" });
            return;
        }

        const deletedUser = deleteSensetiveInfoInUserObjectAndReturn(result);
        res.send({ user: deletedUser });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.delete("/id/:id", authorize, authorizeAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.getById(id);
        if (!user) {
            res.status(404).send({ err: "User not found" });
            return;
        }

        const result = await User.deleteUserById(id);
        if (!result) {
            res.status(500).send({ err: "Failed to delete user" });
            return;
        }

        const deletedUser = deleteSensetiveInfoInUserObjectAndReturn(result);
        res.send({ user: deletedUser });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/me/orders", authorize, async (req, res) => {
    if (!req.user) {
        res.status(500).send({ err: "Couldn't retrieve user obj" })
        return;
    }

    const orders = await Order.getFromUser(req.user.id);
    
    res.send({ orders: orders?.map(x => deleteRedundantInfoInOrderObjectAndReturn(x)) });
});


export default router;
