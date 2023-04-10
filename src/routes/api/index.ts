import { Router } from "express";
import { userRouter } from "./users.route";
import { productsRouter } from "./services.route";
import { profilesRouter } from "./profiles.route";
import { tagsRouter } from "./tags.route";
import { nextTick } from "process";

const router = Router();

router.use("/users", userRouter);
router.use("/tags", tagsRouter);
router.use("/products", productsRouter);




export { router as apiRouter };
