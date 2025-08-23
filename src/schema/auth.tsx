import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string(),
  password: z
    .string()
    .trim()
    .min(6, "Password needs to be at lest 6 character"),
});

export const signUpValidationSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(8, { message: "Phone must be at least 88 digits" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  street: z.string().min(2, { message: "Street is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  postalCode: z
    .string()
    .regex(/^[0-9]{4,6}$/, { message: "Postal Code must be 4-6 digits" }),
  country: z.string().min(2, { message: "Country is required" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
});

export const resetPasswordSchema = z.object({
  newPassword: z
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
