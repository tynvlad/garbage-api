import { garbageStorage } from "..";
import { procedure, router } from "../trpc/trpc.init";

import { z } from "zod";
import { IGarbageModel } from "../models/garbage.model";
import { generateOpenApiDocument } from "trpc-openapi";

export const garbageModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
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
  "get-garbages": procedure
    .meta({
      openapi: { method: "GET", path: "/get-garbages", tags: ["garbage"] },
    })
    .input(z.void())
    .output(z.array(garbageModelSchema))
    .query(() => garbageStorage.getGarbageList()),
  "remove-garbage": procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/remove-garbage/{id}",
        tags: ["garbage"],
      },
    })
    .input(
      z.object({
        id: z.string(),
      })
    )
    .output(z.void())
    .query(({ input }) => garbageStorage.removeGarbage(input.id)),
  "update-garbage": procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/update-garbage/{id}",
        tags: ["garbage"],
      },
    })
    .input(garbageModelSchema)
    .output(garbageModelSchema)
    .mutation(({ input }) => garbageStorage.updateGarbage(input)),
  "create-garbage": procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/create-garbage",
        tags: ["garbage"],
      },
    })
    .input(garbageModelSchemaDTO)
    .output(garbageModelSchema)
    .mutation(({ input }) => garbageStorage.addGarbage(input)),
});

export const openApiDocument = generateOpenApiDocument(trpcRouter, {
  title: "Example CRUD API",
  description: "OpenAPI compliant REST API built using tRPC with Express",
  version: "1.0.0",
  baseUrl: "http://localhost:5000/api",
  tags: ["garbage"],
});

export type AppRouter = typeof trpcRouter;
