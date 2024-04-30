import { z } from "zod";

export const UserSchemaCreate = z.object({
  name: z.string(),
  age: z.number(),
});

export const UserSchemaUpdate = z.object({
  name: z.string().optional(),
  age: z.number().optional(),
});
