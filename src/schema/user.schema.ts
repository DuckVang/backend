import { TypeOf, object, string } from "zod";

export const registerUserSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    email: string({ required_error: "Email is required" }).email(
      "Invalid email"
    ),
    password: string({ required_error: "Password is required" })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be more than 32 characters"),
    passwordConfirm: string({ required_error: "Please confirm the password" }),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Invalid email or password "
    ),
    password: string({ required_error: "Password is required" }).min(
      8,
      "Invalid email or password"
    ),
  }),
});

export type LoginUserSchema = TypeOf<typeof loginUserSchema>["body"]
export type RegisterUserSchema = TypeOf<typeof registerUserSchema>["body"]