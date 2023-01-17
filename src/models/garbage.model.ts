import { z } from "zod";
import { garbageModelSchema, garbageModelSchemaDTO } from "../trpc/schemas";

export type GarbageModel = z.infer<typeof garbageModelSchema>;

export type GarbageModelDTO = z.infer<typeof garbageModelSchemaDTO>;
