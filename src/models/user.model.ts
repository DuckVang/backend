import mongoose, { mongo } from "mongoose";
import {
  prop,
  getModelForClass,
  pre,
  index,
  modelOptions,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";



@index({ email: 1 }, { unique: true })
@pre<User>("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop({ required: false, default: "user" })
  object: string;

  @prop({ required: true, trim: true })
  name!: string;

  @prop({ required: true, trim: true, unique: true })
  email!: string;

  @prop({
    required: true,
    trim: true,
    minlength: 8,
    maxLength: 32,
  })
  password!: string;

  static async comparePasswords(
    hashedPassword: string,
    comparedPassword: string
  ) {
    return await bcrypt.compare(comparedPassword, hashedPassword);
  }
//   async generateAuthToken() {

//     const user = this
    
//     const token = await sign({_id: user.})
//   }
}

export const UserModel = getModelForClass(User);
