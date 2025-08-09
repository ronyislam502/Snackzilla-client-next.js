import z from "zod";

export const foodCreatedSchema = z.object({
  category: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be non-negative"),
  preparationTime: z.number().min(0, "Preparation time must be non-negative"),
});

export const foodUpdatedSchema = z.object({
  category: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  preparationTime: z.number().optional(),
});
