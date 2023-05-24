import { NextFunction, Router, response } from "express";
import mongoose, { Schema } from "mongoose";
import { Request, Response } from "express";

import { User, UserModel } from "../../models/user.model";
import general from "../../config/general.config";
import {
  RegisterUserInput,
  registerUserSchema,
} from "../../schema/user.schema";
import validate from "../../middlewares/validation";
import verifyToken from "../../middlewares/verify";
import { verify } from "jsonwebtoken";
const router = Router();

interface SignUpRequest extends Request {
  email: string;
  password: string;
}

interface UserRequest extends Request {
  id?: Schema.Types.ObjectId;
  name?: string;
}
interface SearchRequest extends Request {
  query: any;
  limit?: number;
  page?: number;
}
router.use(verifyToken);

router.get("/", async function (req: SearchRequest, res) {
  const users: User[] = await UserModel.find({}).limit(
    req.limit || general.listPerPage
  );
  res.status(200).json(users);
});

router.post(
  "/",
  validate(registerUserSchema),
  async function (req: Request, res: Response, next: NextFunction) {
    req.body;

    try {
      const created = await UserModel.create(req.body);
      res.json(created).status(200);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", async function (req: Request, res, next) {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user).status(200);
  } catch (error) {
    next(error);
  }
});
router.delete(
  "/:id",
  async function (req: UserRequest, res, next: NextFunction) {
    try {
      const deleted = await UserModel.findByIdAndDelete(req.params.id);
      res.json(deleted).status(204);
    } catch (error) {
      next(error);
    }
  }
);
router.put("/:id", async function (req: UserRequest, res, next: NextFunction) {
  try {
    const { id } = req.params;
    await UserModel.updateOne({ id }, req.body);
    const updated: User | null = await UserModel.findById(id);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});
router.get("/search", async function (req: SearchRequest, res) {});

export { router as userRouter };
