import { Router } from "express";
import mongoose from "mongoose";
import { Request, Response } from "express";

import { User, UserModel } from "../../models/user";
const router = Router();

interface UserRequest extends Request {
  name?: string;
}
interface SearchRequest extends Request {
  query: any;
  limit?: number;
  page?: number;
}

router.get("/", async function (req, res) {
  // const users = await UserModel
});
router.get("/:id", async function (req: UserRequest, res, next) {
  const user = await UserModel.findOne({ name: "pog" });

  res.send(user);
});
router.post("/:id");
router.delete("/:id");
router.get("/search", async function (req: SearchRequest, res) {});

router.post("/",)
export { router as userRouter };
