import { z } from "zod"

export const userValidationSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z
        .string()
        .optional(),
    country: z.string().optional(),
});

