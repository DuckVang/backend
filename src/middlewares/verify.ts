import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { verify } from "jsonwebtoken";
import { error } from "console";
import {} from "express-jwt";
const tokenSecret = "09f26e402586e2faa8da4c98a35f1b20d6b033c60";
const verifyToken = async function (req: Request, res: Response, next: NextFunction)  {
  const authHeader = req.headers.authorization
    if (authHeader) {
      const token = authHeader.split(" ")[1]
      verify(token, tokenSecret, function (err, decoded) {
        console.log(req.headers.authorization)
        if (err) {
          return res.status(403).json("No");
        }
        console.log(decoded)
        res.status(200)
        next();
      });
    } else next(error)
  };

export default verifyToken;
