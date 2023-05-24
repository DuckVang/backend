import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import config from "config";
import mongoose from "mongoose";

import { User, UserModel } from "./models/user.model";
import db from "./config/db.config";
import general from "./config/general.config";

import cors from "cors";
import morgan from "morgan";
import bodyParser, { urlencoded } from "body-parser";
import { indexRoute } from "./routes";
import path from "path";
import multer from "multer";
import ErrorHandler from "./middlewares/errrorHandler";
import cookieParser from "cookie-parser";

const mongoString: string = db.host;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan(":method :url :status :res[content-length]"));
app.use(express.static(path.join(__dirname, "../public")));

// mongoose.connect(mongoString);
// mongoose.set("debug", true);

app.use("/", indexRoute);

app.use(ErrorHandler);

const start = async (): Promise<void> => {
  await mongoose.connect(mongoString, () => {
    mongoose.set("debug", true);

    console.log("connected to database");

    app.listen(general.port, () => {
      console.log(`Server started on http://localhost:${general.port}/home`);
    });
  });
};

void start();

// const port = config.get<number>("port");

// app.post("/users", async (req: Request, res: Response): Promise<Response> => {
//   console.log(req.body)
//   const user: User = await UserModel.create({ name: req.body.name });
//   return res.status(201).json(user);
// });
// app.get("/", async (req: Request, res: Response): Promise<Response> => {
//   const user: User = await UserModel.create({ name: "pog" });
//   return res.status(201).json(user);
// });
// const start = async (): Promise<void> => {
//   await mongoose.connect(mongoString, () => {
//     console.log("connected to database");

//     app.listen(8004, () => {
//       console.log(`Server started on port: ${8004}`);
//     });
//   });
// };
// void start();
