import Express from "express";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "./../configs/environment";
import { IUserModel } from "../models/user";
import User from "../controllers/user";
import { sha3 } from "./../configs/auth";
import { PWD_SALT } from "./../configs/environment";


const router = Express.Router();

router.post("/register", async (req, res) => {
    if (!req.body) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }
    const requiredFields = [
        { name: "username", minLength: 5 },
        { name: "password", minLength: 8 },
        { name: "firstName", minLength: 2 },
        { name: "surname", minLength: 2 },
    ];

    const nonRequiredFields = [
        { name: "lastName", minLength: 2 },
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
        const id = await User.create({
            username: req.body.username,
            hashedPassword: sha3(req.body.password, PWD_SALT),
            firstName: req.body.firstName,
            surname: req.body.surname,
            lastName: req.body.lastName
        });
        res.status(201).send({ id });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    if (!username) {
        res.status(400).send({ err: "Invalid username" });
        return;
    }
    const password = req.body.password;
    if (!password) {
        res.status(400).send({ err: "Invalid password" });
        return;
    }
    
    let user: IUserModel | null;
    try {
        user = await User.getByUsername(username);
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
        return;
    }

    if (user === null || user.hashedPassword !== sha3(password, PWD_SALT)) {
        res.status(400).send({ err: "Username or password are invalid"});
        return;
    }

    const token = JWT.sign({ id: user.id }, JWT_SECRET);
    return res.json({ token });
});

export default router;
