import z from "zod";

export const foodCreatedSchema = z.object({
  category: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be non-negative"),
  preparationTime: z.number().min(0, "Preparation time must be non-negative"),
  tags: z.string(), // We'll handle comma-separated string in form then map to array
  ingredients: z.string(),
  allergens: z.string(),
  calories: z.number(),
  protein: z.string(),
  carbs: z.string(),
  fat: z.string(),
  isVegetarian: z.boolean(),
  isSpicy: z.boolean(),
});

export const foodUpdatedSchema = z.object({
  category: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  preparationTime: z.number().optional(),
  tags: z.string().optional(),
  ingredients: z.string().optional(),
  allergens: z.string().optional(),
  calories: z.number().optional(),
  protein: z.string().optional(),
  carbs: z.string().optional(),
  fat: z.string().optional(),
  isVegetarian: z.boolean().optional(),
  isSpicy: z.boolean().optional(),
});
