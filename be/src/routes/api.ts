import Express from "express";
import ApiAuthRouter from "./api.auth";
import ApiUserRouter from "./api.user";
import ApiReviewRouter from './api.review';
import ApiOrderRouter from './api.order';
import ApiLibraryRouter from './api.library';
import ApiIssuerRouter from './api.issuer';
import ApiCatalogueRouter from './api.catalogue';
import ApiBookRouter from './api.book';
import ApiAuthorRouter from './api.author';

const router = Express.Router();

router.use("/auth", ApiAuthRouter);
router.use("/user", ApiUserRouter);
router.use("/review", ApiReviewRouter);
router.use("/order", ApiOrderRouter);
router.use("/library", ApiLibraryRouter);
router.use("/issuer", ApiIssuerRouter);
router.use("/catalogue", ApiCatalogueRouter);
router.use("/book", ApiBookRouter);
router.use("/author", ApiAuthorRouter);

export default router;
