import { Router } from "express";
import { userRouter } from "./users";
import { serviceRouter } from "./services";
import { profilesRouter } from "./profiles";
import { tagsRouter } from "./tags";
import { nextTick } from "process";

const router = Router();

router.use("/users", userRouter);
router.use("/tags", tagsRouter);
router.use("/services", serviceRouter);
router.use("/profiles", profilesRouter);

router.use("/", (req, res, next) => {
  res.send("welcome to api router");
});

export { router as apiRouter };
