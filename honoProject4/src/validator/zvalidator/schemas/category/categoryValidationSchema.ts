import { z } from "zod";

export const createCategoryJsonValidationSchema = z.object({
    name : z.string().min(1).max(100),
    description : z.string().min(1).max(1000),
  }).strict();

  export const updateCategoryJsonValidationSchema = z.object({
    name : z.string().min(1).max(100),
    description : z.string().min(1).max(1000),
  }).strict();

export const updateCategoryParamValidationSchema = z.object({
    id: z.string().uuid(),
  }).strict();

  export const deleteCategoryParamValidationSchema = z.object({
    id: z.string().uuid(),
  }).strict();

export const getByIdCategoryParamValidationSchema = z.object({
    id: z.string().uuid(),
  }).strict();