import mongoose, { mongo } from "mongoose";
import { prop,getModelForClass } from "@typegoose/typegoose";

export class User{
    public object: string = "user"

    @prop({required: true})
    public name!: string

  
}   


export const UserModel = getModelForClass(User)
