import { Router } from "express";
import mongoose from "mongoose";


import { UserModel } from "../../models/user";
const router = Router();

router.get("/", function (req, res, next) {
    // UserModel.findById(req.payload.id)
    //   .then(function (user) {
    //     if (!user) {
    //       return res.sendStatus(401);
    //     }
    //     return res.json({ user: user.toAuthJSON() });
    //   })
    //   .catch(next);
    res.send("users")
});
export { router as userRouter };
