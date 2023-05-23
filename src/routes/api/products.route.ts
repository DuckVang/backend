import {
  CreateProductInput,
  createProductSchema,
} from "../../schema/product.schema";
import { ProductModel } from "../../models/product.model";
import { Router, Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import general from "../../config/general.config";
import mongoose from "mongoose";
import validate from "../../middlewares/validation";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import db from "../../config/db.config";
const router = Router();

// Set multer storage engine to the newly created object
const upload = multer({ dest: "public/uploads/" });

router.use(upload.single("image"));

router.get("/", async function (req, res, next) {
  const products = await ProductModel.find({}).limit(general.listPerPage);
  res.json(products);
});
router.post(
  "/",
  validate(createProductSchema),
  async function (req: Request<{}, {}, CreateProductInput>, res: Response) {
    console.log(req.body);
    console.log(req.file?.mimetype);

    // req.body;
    // try {
    //   const user = await UserModel.findById(req.body.userId);
    //   const product = await ProductModel.create({
    //     user: user,
    //     name: req.body.name,
    //     description: req.body.description,
    //   });
    //   res.json(product).status(200);
    // } catch (error) {
    //   res.json(error).status(404);
    // }
  }
);
router.delete("/:id", async function (req: Request, res: Response) {
  try {
    const deleted = await ProductModel.findByIdAndDelete(req.params.id);
    res.json(deleted).status(204);
  } catch (error) {
    res.json(error).status(400);
  }
});
router.get("/:id", async function (req: Request, res: Response) {
  try {
    const user = await ProductModel.findById(req.params.id);
    res.json(user).status(200);
  } catch (error) {
    res.json(error).status(400);
  }
});
router.put("/:id", async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    await ProductModel.updateOne({ id }, req.body);
    const product = await ProductModel.findById(req.params.id);

    res.json(product).status(200);
  } catch (error) {
    res.json(error).status(400);
  }
});
export { router as productsRouter };
