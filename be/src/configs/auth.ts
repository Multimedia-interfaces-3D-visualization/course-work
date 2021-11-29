import Crypto from "crypto";
import Passport from "passport";
import { Request, Response, NextFunction } from "express";
import { VerifyCallback } from "passport-jwt";
import User from "../controllers/user";


export const parseUserFromToken: VerifyCallback = async (jwtPayload, cb) => {
    let user = null;
    try {
        if (!jwtPayload || !jwtPayload.id) {
            throw new Error("Couldn't get id from token");
        }
        user = User.getById(jwtPayload.id);
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

export function sha3(password: string, salt: string) {
    const hash = Crypto.createHmac("sha3-512", salt);
    hash.update(password);
    return hash.digest("hex");
}
