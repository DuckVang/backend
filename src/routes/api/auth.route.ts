import { Router, Response, Request } from "express";
import {
  loginHandler,
  registerHandler,
} from "../../controllers/auth.controller";
import {
  LoginUserInput,
  RegisterUserInput,
  loginUserSchema,
  registerUserSchema,
} from "../../schema/user.schema";
import validate from "../../middlewares/validation";
import { User, UserModel } from "../../models/user.model";
import { throttle } from "lodash";
import { sign } from "jsonwebtoken";

const tokenSecret = "09f26e402586e2faa8da4c98a35f1b20d6b033c60";

const router = Router();

// router.post("/login",loginHandler )
// router.post("/register", registerHandler)
router.post(
  "/register",
  validate(registerUserSchema),
  async function (req: Request, res: Response) {
    req.body;

    try {
      const created = await UserModel.create(req.body);

      res
        .json({
          message: "registered in",
          accessToken: sign(req.body.email, tokenSecret),
          data: {
            user: created,
          },
        })
        .status(200);
    } catch (error) {
      res.send(error).status(400);
    }
  }
);
router.post(
  "/login",
  validate(loginUserSchema),
  async function (req: Request<{}, {}, LoginUserInput>, res: Response) {
    try {
      const user: User | null = await UserModel.findOne({
        email: req.body.email,
      });
      if (!user) throw new Error();

      if (!(await UserModel.comparePasswords(user.password, req.body.password)))
        throw new Error();

      res
        .json({
          message: "logged in",
          accessToken: sign(req.body.email, tokenSecret),
          data: { user: user },
        })
        .status(200);
    } catch (error) {
      res.json("Invalid password or mail").status(400);
    }
  }
);

export { router as authRouter };
