import { Router, Response } from "express";
import { apiRouter } from "./api";
import { authRouter } from "./api/auth.route";
const router = Router();

router.use("/api", apiRouter);
router.use("/auth", authRouter)


export { router as indexRoute };
