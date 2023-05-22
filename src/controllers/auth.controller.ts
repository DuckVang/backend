import { UserModel } from "../models/user.model";
import { LoginUserInput, RegisterUserInput } from "../schema/user.schema";
import { CookieOptions, Request, Response } from "express";

const accessTokenCokkiesOptions: CookieOptions = {};

export const registerHandler = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  try {
    const user = await UserModel.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });
    console.log("🚀 ~ file: auth.controller.ts:17 ~ user:", user)

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Email already exist",
      });
    }
  }
};
export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (
      !user ||
      !(await UserModel.comparePasswords(user.password, req.body.password))
    ) {
      res.send("Invalid email or password").status(401);
    }

    res.send("Login successful").status(200);
  } catch (error) {
    res.send;
  }
};
