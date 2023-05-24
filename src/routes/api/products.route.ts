import {
  CreateProductInput,
  createProductSchema,
} from "../../schema/product.schema";
import { ProductModel } from "../../models/product.model";
import { Router, Request, Response, NextFunction } from "express";
import { UserModel } from "../../models/user.model";
import general from "../../config/general.config";
import mongoose from "mongoose";
import validate from "../../middlewares/validation";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import db from "../../config/db.config";
import upload from "../../middlewares/upload";
const router = Router();

// Set multer storage engine to the newly created object

// router.use(upload.none());

router.get("/", async function (req, res, next) {
  const products = await ProductModel.find({}).limit(general.listPerPage);
  res.json(products);
});
router.post(
  "/",
  [upload.single("image"), validate(createProductSchema)],
  async function (
    req: Request<{}, {}, CreateProductInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserModel.findById(req.body.userId);
      const product = await ProductModel.create({
        user: user,
        name: req.body.name,
        description: req.body.description,
        imageID: req.file?.filename,
      });
      res.json(product).status(200);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await ProductModel.findByIdAndDelete(req.params.id);
      res.json(deleted).status(204);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = await ProductModel.findById(req.params.id);
      res.json(user).status(200);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  "/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ProductModel.updateOne({ id }, req.body);
      const product = await ProductModel.findById(req.params.id);

      res.json(product).status(200);
    } catch (error) {
      next(error);
    }
  }
);
export { router as productsRouter };
