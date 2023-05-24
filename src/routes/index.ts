import { Router, Response, NextFunction } from "express";
import { apiRouter } from "./api";
import { authRouter } from "./auth.route";
const router = Router();

router.get("/", (req, res: Response, next: NextFunction) => {
  res.render("index", { title: "Express" });
});

router.get("*", function (req, res, next: NextFunction) {
  next(new Error("Invalid route"));
});

router.use("/api", apiRouter);
router.use("/auth", authRouter);

export { router as indexRoute };
