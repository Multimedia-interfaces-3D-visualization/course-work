import Express from "express";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "./../configs/environment";


const router = Express.Router();

router.post("/register", async (req, res) => {
    const loginRegExPattern = /[A-Za-z_0-9]{5,20}/;
    if (!req.body) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }
    const login = req.body.username;
    if (!login || !login.match(loginRegExPattern)) {
        res.status(400).send({ err: "Invalid login" });
        return;
    }
    const password = req.body.password;
    if (!password || password.length < 8 || password.length > 30) {
        res.status(400).send({ err: "Invalid password" });
        return;
    }
    const fullName = req.body.fullName ? req.body.fullName.trim() : null;
    if (!fullName || fullName.length < 3 || fullName.length > 30) {
        res.status(400).send({ err: "Invalid fullName" });
        return;
    }
    // TODO create user
    // const user = new User(
    //     "", login, sha512(password, Enviroment.PasswordSalt!), "photographer",
    //     !isPhotographer, fullname
    // );
    // let createdUser;
    // try {
    //     const id = await User.insert(user);
    //     createdUser = await User.getById(id);
    // } catch (e) {
    //     res.status(400).send({ err: e.toString() });
    //     return;
    // }
    res.status(201).send({ user: { login, fullName } });
});

router.post("/login", async (req, res) => {
    const loginRegExPattern = /[A-Za-z_0-9]{5,20}/;
    const login = req.body.username;
    if (!login || !login.match(loginRegExPattern)) {
        res.status(400).send({ err: "Invalid login" });
        return;
    }
    const password = req.body.password;
    if (!password || password.length < 8 || password.length > 30) {
        res.status(400).send({ err: "Invalid password" });
        return;
    }
    // TODO get user
    // let user: User | null;
    // try {
    //     user = await User.getByLogin(login);
    //     if (user === null
    //         || user.password !== sha512(password, Enviroment.PasswordSalt!)) {
    //         throw Error("Username or password are invalid");
    //     }
    // } catch (e) {
    //     res.status(400).send({ err: e.toString() });
    //     return;
    // }
    const token = JWT.sign({ id: "test" }, JWT_SECRET);
    // cleanSensetiveUserInfo(user!);
    // TODO - maybe send token
    return res.json({ token });
});

export default router;
