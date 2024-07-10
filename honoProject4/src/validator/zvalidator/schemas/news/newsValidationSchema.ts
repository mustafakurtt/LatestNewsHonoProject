import { z } from "zod";

export const createNewsJsonValidationSchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(1000),
    categoryId: z.number().optional(),
    tagsIds : z.array(z.string().uuid()).optional(),
    imageUrl: z.string().optional(),
}).strict();

export const updateNewsJsonValidationSchema = z.object({
    title: z.string().min(1).max(100).optional(),
    content: z.string().min(1).max(1000).optional(),
    categoryId: z.number().optional(),
    tagsIds : z.array(z.string().uuid()).optional(),
    imageUrl: z.string().optional(),
}).strict();

export const updateNewsParamValidationSchema = z.object({
    id: z.string().uuid(),
}).strict();

export const deleteNewsParamValidationSchema = z.object({
    id: z.string().uuid(),
}).strict();

export const getByIdNewsParamValidationSchema = z.object({
    id: z.string().uuid(),
}).strict();