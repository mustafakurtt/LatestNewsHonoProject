
import { z } from "zod";

export const getTagParamValidationSchema = z.object({
    id: z.string().uuid(),
  }).strict();

export const createTagJsonValidationSchema = z.object({
    name : z.string().min(1).max(100),
    description : z.string().min(1).max(1000),
  }).strict();

export const updateTagJsonValidationSchema = z.object({
    name : z.string().min(1).max(100),
    description : z.string().min(1).max(1000),
  }).strict();

export const updateTagParamValidationSchema = z.object({
    id: z.string().uuid(),
  }).strict();


export const deleteTagParamValidationSchema = z.object({
    id: z.string().uuid(),
    }).strict();
