import Express from "express";
import { AnyKeys } from "mongoose";
import { authorize, authorizeVisitor } from "../configs/auth";
import Review from "../controllers/review";
import { IReviewModel } from "../models/review";


function deleteRedundantInfoInObjectAndReturn(data: IReviewModel) {
    const review: AnyKeys<IReviewModel> = { ...data.toObject() } ;
    delete review.__v;
    review.id = review._id;
    delete review._id;
    return review;
}

const router = Express.Router();

router.post("/add", authorize, authorizeVisitor, async (req, res) => {
    if (!req.body) {
        res.status(400).send({ err: "Invalid request data in body" });
        return;
    }

    try {
        const id = await Review.create({
            reviewer: req.user?.id,
            book: req.body.book,
            starsCount: req.body.starsCount,
            title: req.body.title,
            description:  req.body.description,
        });
        res.status(201).send({ id });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Review.getById(id);
        if (!result) {
            res.status(404).send({ err: "Review not found" });
            return;
        }

        const review = deleteRedundantInfoInObjectAndReturn(result);
        res.send({ review });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.get("/all/", async (req, res) => {
    try {
        let results = await Review.getAll();

        const reviews = results.map(x => deleteRedundantInfoInObjectAndReturn(x));
        res.send({ reviews });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.put("/id/:id", authorize, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ err: "Invalid request data in body" });
            return;
        }
        if (!req.user) {
            res.status(500).send({ err: "Couldn't get user info" });
            return;
        }

        const id = req.params.id;
        const review = await Review.getById(id);
        if (!review) {
            res.status(404).send({ err: "Review not found" });
            return;
        }

        if (req.user.role === "visitor" && review.reviewer.toString() !== req.user.id.toString()) {
            res.status(403).send({ err: "Forbidden. Visitors can edit only own reviews" });
            return;
        }

        let objToUpd: AnyKeys<IReviewModel>;

        if (req.user.role === "visitor") {
            objToUpd = {
                book: req.body.book,
                starsCount: req.body.starsCount,
                title: req.body.title,
                description: req.body.description,
            };
        } else {
            objToUpd = {
                reviewer: req.body.reviewer,
                book: req.body.book,
                starsCount: req.body.starsCount,
                title: req.body.title,
                description: req.body.description,
            };
        }

        const result = await Review.updateById(id, objToUpd);
        if (!result) {
            res.status(500).send({ err: "Failed to update review" });
            return;
        }
    
        const updatedReview = deleteRedundantInfoInObjectAndReturn(result);
        res.send({ review: updatedReview });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

router.delete("/id/:id", authorize, async (req, res) => {
    try {
        if (!req.user) {
            res.status(500).send({ err: "Couldn't get user info" });
            return;
        }

        const id = req.params.id;
        const review = await Review.getById(id);
        if (!review) {
            res.status(404).send({ err: "Review not found" });
            return;
        }

        if (req.user.role === "visitor" && review.reviewer.toString() !== req.user.id.toString()) {
            res.status(403).send({ err: "Forbidden. Visitors can delete only own reviews" });
            return;
        }

        const result = await Review.deleteById(id);
        if (!result) {
            res.status(500).send({ err: "Failed to delete review" });
            return;
        }

        const deletedReview = deleteRedundantInfoInObjectAndReturn(result);
        res.send({ review: deletedReview });
    } catch (e) {
        res.status(500).send({ err: (e instanceof Error && JSON.stringify(e) === "{}") ? (e as Error).message : e });
    }
});

export default router;
