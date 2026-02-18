import z from "zod";

export const blogCreatedSchema = z.object({
    user: z.string(),
    title: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    tags: z.array(z.string().min(1, "Tag cannot be empty")),
});

export const blogUpdatedSchema = z.object({
    user: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string().optional()),
});