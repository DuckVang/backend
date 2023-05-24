import mongoose, { mongo } from "mongoose";
import {
  prop,
  getModelForClass,
  pre,
  index,
  modelOptions,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";

// @index({ email: 1 }, { unique: true })
// @pre<User>("save", async function () {
//   if (!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 12);
// })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Product {
  @prop({ required: false, default: "product" })
  object: string;
  @prop({ ref: () => User })
  user!: Ref<User>;
  @prop({ required: true, trim: true })
  name!: string;
  @prop({ required: true, trim: true })
  description!: string;
  @prop({ required: true, trim: true })
  imageID!: string;
}

export const ProductModel = getModelForClass(Product);
