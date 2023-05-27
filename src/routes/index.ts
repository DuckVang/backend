import { Router, Response, NextFunction } from "express";
import { apiRouter } from "./api";
import { authRouter } from "./auth.route";
import validate from "../middlewares/validation";
import { viewRouter } from "./view.route";
const router = Router();

router.get("/", (req, res: Response, next: NextFunction) => {
  res.render("index", { title: "Express" });
});

router.use("/view", viewRouter);
router.use("/api", apiRouter);
router.use("/auth", authRouter);

router.get("*", function (req, res, next: NextFunction) {
  next(new Error("Invalid route"));
});


export { router as indexRoute };
