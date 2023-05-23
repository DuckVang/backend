import { Router, Response } from "express";
import { apiRouter } from "./api";
import { authRouter } from "./api/auth.route";
const router = Router();
router.use("/home", (req, res: Response) => {
  res.render("index", { title: "Express" });
});
router.use("/api", apiRouter);
router.use("/auth", authRouter);

export { router as indexRoute };
