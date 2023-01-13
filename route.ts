import { garbageStorage } from ".";
import { procedure, router } from "./trpc.init";

import { z } from "zod";
import { IGarbageModel } from "./garbage.model";

export const garbageModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdDate: z.date(),
  updatedDate: z.date(),
  link: z.string(),
  comment: z.string(),
  tags: z.array(z.string()),
});

export const garbageModelSchemaDTO = z.object({
  name: z.string(),
  link: z.string(),
  comment: z.string(),
  tags: z.array(z.string()),
});

export const trpcRouter = router({
  "get-garbages": procedure.query(() => garbageStorage.getGarbageList()),
  "remove-garbage": procedure
    .input(z.string())
    .query(({ input }) => garbageStorage.removeGarbage(input)),
  "update-garbage": procedure
    .input(garbageModelSchema)
    .mutation(({ input }) => garbageStorage.updateGarbage(input)),
  "create-garbage": procedure
    .input(garbageModelSchemaDTO)
    .mutation(({ input }) => garbageStorage.addGarbage(input)),
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof trpcRouter;
