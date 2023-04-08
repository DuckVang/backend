import { Router } from "express";
import mongoose from "mongoose";


const router = Router();

router.get("/", function (req, res, next) {
    res.send("profiles")

});
export { router as profilesRouter };
