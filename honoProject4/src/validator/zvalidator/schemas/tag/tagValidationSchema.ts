
import { z } from "zod";

export const createTagJsonValidationSchema = z.object({
    name : z.string().min(1).max(100),
    description : z.string().min(1).max(1000),
  }).strict();

