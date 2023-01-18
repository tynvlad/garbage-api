import { z } from "zod";

export const garbageModelSchemaDTO = z.object({
  name: z.string(),
  link: z.string(),
  comment: z.string(),
  tags: z.array(z.string()),
});

export const garbageModelSchema = z
  .object({
    id: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
  .merge(garbageModelSchemaDTO);
