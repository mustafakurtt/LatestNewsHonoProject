import { z } from "zod";

export const createNewsJsonValidationSchema = z.object({
    userId: z.string().uuid(),
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(1000),
    categoryId: z.string().uuid(),
    tagIds: z.array(z.string().uuid()),
    imageUrl: z.string().optional(),
  }).strict();

