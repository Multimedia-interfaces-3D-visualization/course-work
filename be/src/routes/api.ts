import Express from "express";
import ApiAuthRouter from "./api.auth";
import ApiUserRouter from "./api.user";

const router = Express.Router();

router.use("/auth", ApiAuthRouter);
router.use("/user", ApiUserRouter);

export default router;
