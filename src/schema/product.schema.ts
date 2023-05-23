import { TypeOf, object, string, any } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createProductSchema = object({
  body: object({
    userId: string({ required_error: "userId is required" }),
    name: string({ required_error: "Name is required" }),
    description: string({ required_error: "Description is required" }),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>["body"];
