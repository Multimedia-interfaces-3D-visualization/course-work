import Crypto from "crypto";
import Passport from "passport";
import { Request, Response, NextFunction } from "express";
import { VerifyCallback } from "passport-jwt";
import User from "../controllers/user";
import { IUserModel } from "./../models/user";


declare global {
    namespace Express {
        interface User extends IUserModel { }
    }
}

export const parseUserFromToken: VerifyCallback = async (jwtPayload, cb) => {
    let user = null;
    try {
        if (!jwtPayload || !jwtPayload.id) {
            throw new Error("Couldn't get id from token");
        }
        user = await User.getById(jwtPayload.id);
    } catch (e) {
        return cb(e, null);
    }
    cb(null, !user ? false : user);
};

export function authorize(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        const jwtAuthMiddleware = Passport.authenticate("jwt", { session: false });
        return jwtAuthMiddleware(req, res, next);
    }
    next();
}

export function authorizeVisitor(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    if (user && user.role === "visitor") {
        next();
    } else {
        res.status(403).send({ err: "Forbidden. Allowed only for visitors" });
    }
}

export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    if (user && user.role === "admin") {
        next();
    } else {
        res.status(403).send({ err: "Forbidden. Allowed only for admins" });
    }
}

export function sha3(password: string, salt: string) {
    const hash = Crypto.createHmac("sha3-512", salt);
    hash.update(password);
    return hash.digest("hex");
}
