import { TypeOf, object, string } from "zod";

export const createProductSchema = object({
  body: object({
    userId: string({ required_error: "userId is required" }),
    name: string({ required_error: "Name is required" }),
    description: string({required_error: "Description is required"}),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>["body"];
