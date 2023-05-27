import { Router } from "express";
import { ProductModel } from "../models/product.model";
import general from "../config/general.config";
import upload from "../middlewares/upload";

const router = Router();

router.use(upload.none());

router.get("/", async (req, res, next) => {
  res.redirect("/view/products");
});
router.use("/users", async (req, res, next) => {});
router.get("/products/:id", async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.render("product", { product: product });
  } catch (error) {
    next(error);
  }

});
router.use("/products/", async (req, res, next) => {
  const products = await ProductModel.find({}).limit(general.listPerPage);
  console.log(products);

  res.render("products", { title: "Express", products: products });
});

export { router as viewRouter };
