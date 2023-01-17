import { garbageStorage, PORT } from "../index";
import { procedure, router } from "../trpc/trpc.init";

import { z } from "zod";

import { garbageModelSchema, garbageModelSchemaDTO } from "../trpc/schemas";
import {
  getAllGarbageApiMeta,
  removeGarbageApiMeta,
  updateGarbageApiMeta,
  createGarbageApiMeta,
} from "./documents";

export const trpcRouter = router({
  /** Get full list garbages*/
  "get-garbages": procedure
    .meta(getAllGarbageApiMeta)
    .input(z.void())
    .output(z.array(garbageModelSchema))
    .query(() => garbageStorage.getGarbageList()),
  /** Remove garbage*/
  "remove-garbage": procedure
    .meta(removeGarbageApiMeta)
    .input(
      z.object({
        id: z.string(),
      })
    )
    .output(z.void())
    .query(({ input }) => garbageStorage.removeGarbage(input.id)),
  /** Update garbage */
  "update-garbage": procedure
    .meta(updateGarbageApiMeta)
    .input(garbageModelSchema)
    .output(garbageModelSchema)
    .mutation(({ input }) => garbageStorage.updateGarbage(input)),
  /** Create garbage */
  "create-garbage": procedure
    .meta(createGarbageApiMeta)
    .input(garbageModelSchemaDTO)
    .output(garbageModelSchema)
    .mutation(({ input }) => garbageStorage.addGarbage(input)),
});

export type AppRouter = typeof trpcRouter;
