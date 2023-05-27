import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
  static as expressStatic,
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
import { Server } from "socket.io";
import { addListeners } from "./socket";

const mongoString: string = db.host;

let EXPRESS_SERVER, SOCKET_SERVER: Server;

const app = express();
app.use(expressStatic(path.join(__dirname, "public")));
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

    EXPRESS_SERVER = app.listen(general.port, () => {
      console.log(`Server started on http://localhost:${general.port}`);
    });
    SOCKET_SERVER = new Server(EXPRESS_SERVER, { cors: { origin: "*" } });

    addListeners(SOCKET_SERVER);
    
  });
};

void start();

export { EXPRESS_SERVER, SOCKET_SERVER };
