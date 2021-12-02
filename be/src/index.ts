import Express from "express";
import Mongoose from "mongoose";
import Passport from "passport";
import PassportJwt from "passport-jwt";
import { DB_URL, PORT, JWT_SECRET } from "./configs/environment";
import { parseUserFromToken } from "./configs/auth";
import ApiRouter from "./routes/api";

// import Path from "path";
// import { getUserFromToken } from "@services/authentication";

const app = Express();

// app.use(Express.static("dist"));
// app.use(Express.static("assets"));

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

const jwtAsBearerToken = PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
app.use(Passport.initialize());
Passport.use(new PassportJwt.Strategy({ jwtFromRequest: jwtAsBearerToken, secretOrKey: JWT_SECRET }, parseUserFromToken));

app.use("/api/v1", ApiRouter);

// import { authorize, authorizeAdmin, authorizeVisitor } from "./configs/auth";
// app.get("/test", authorize, authorizeVisitor, (req, res) => {
//     console.log(req.user?.id);
//     res.send("hello");
// });

// app.use("*", (_req, res) => {
//     res.sendFile(Path.join(__dirname, `./../dist/index.html`));
// });

// app.use(((err, _req, res, _next) => {
//     console.error(err);
//     return res.sendFile(Path.join(__dirname, `./../dist/index.html`));
// }) as Express.ErrorRequestHandler);

app.use("*", (_req, res) => {
    res.send({
        init: "Hi there!"
    });
});

Mongoose.connect(DB_URL)
    .then(() => console.log(`Opened connection with db`))
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((err) => console.error("An error ocurred while starting web-server:", err.message));
