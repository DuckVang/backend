import { Router, Response, Request, NextFunction } from "express";
import { loginHandler, registerHandler } from "../controllers/auth.controller";
import {
  LoginUserInput,
  RegisterUserInput,
  loginUserSchema,
  registerUserSchema,
} from "../schema/user.schema";
import validate from "../middlewares/validation";
import { User, UserModel } from "../models/user.model";
import { throttle } from "lodash";
import { sign } from "jsonwebtoken";
import c from "config";
import { error } from "console";
import upload from "../middlewares/upload";

const tokenSecret = "09f26e402586e2faa8da4c98a35f1b20d6b033c60";

const router = Router();

//only allow textfield when using formdata
router.use(upload.none());

router.post(
  "/register",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const created = await UserModel.create(req.body);

      res.cookie("accessToken", sign(req.body.email, tokenSecret));
      res.cookie("userId", created._id);
      res.render("form", { data: JSON.stringify(created) });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/login",
  validate(loginUserSchema),
  async function (
    req: Request<{}, {}, LoginUserInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user: User | null = await UserModel.findOne({
        email: req.body.email,
      });
      if (!user) throw new Error("Invalid email or password");

      if (!(await UserModel.comparePasswords(user.password, req.body.password)))
        throw new Error("Invalid email or password");

      res.cookie("accessToken", sign(req.body.email, tokenSecret));
      res.cookie("userId", user._id);
      res.render("form", { title: "Express", data: JSON.stringify(user) });
    } catch (error) {
      next(error);
    }
  }
);

export { router as authRouter };
