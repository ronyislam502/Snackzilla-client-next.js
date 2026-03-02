import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Minimum 1 guest required")
  ),
  message: z.string().optional(),
});
