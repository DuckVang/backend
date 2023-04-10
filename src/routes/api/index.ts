import { Router } from "express";
import { userRouter } from "./users.route";
import { productsRouter } from "./products.route";
import { profilesRouter } from "./profiles.route";

import { nextTick } from "process";

const router = Router();

router.use("/users", userRouter);
router.use("/products", productsRouter);




export { router as apiRouter };
