import { Router, Response, NextFunction } from "express";
import { apiRouter } from "./api";
import { authRouter } from "./api/auth.route";
const router = Router();
router.use("/home", (req, res: Response) => {
  res.render("index", { title: "Express" });
});
router.use("/error", (req, res: Response) => {
  res.render("error", { title: "Inccorrect route" });
});
router.use("/api", apiRouter);
router.use("/auth", authRouter);
router.use("*", function (req, res, next: NextFunction) {
  next(new Error("Invalid route"));
});
export { router as indexRoute };
