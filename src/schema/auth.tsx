import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .min(6, "Password needs to be at lest 6 character"),
});

export const contactValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(/^\d{11}$/, "Please enter a valid mobile number!"),
  message: z.string().min(2, "Please enter an message!"),
});
