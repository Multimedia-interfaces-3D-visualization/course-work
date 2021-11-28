import { VerifyCallback } from "passport-jwt";


export const parseUserFromToken: VerifyCallback = async (jwtPayload, cb) => {
    let user = null;
    try {
        if (!jwtPayload || !jwtPayload.id) {
            throw new Error("Couldn't get id from token");
        }
        // TODO - here should be fetching user by Id
        user = {
            id: jwtPayload.id,
            name: "Name here"
        };
    } catch (e) {
        return cb(e, null);
    }
    cb(null, !user ? false : user);
};
