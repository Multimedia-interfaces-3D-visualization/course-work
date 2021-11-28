import Express from "express";
import ApiAuthRouter from "./api.auth";

const router = Express.Router();

router.use("/auth", ApiAuthRouter);

export default router;
