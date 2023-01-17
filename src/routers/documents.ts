import { generateOpenApiDocument, OpenApiMeta } from "trpc-openapi";
import { PORT } from "../index";
import { trpcRouter } from "./route";

const garbageRequestTag = "garbage" as const;

export const openApiDocument = generateOpenApiDocument(trpcRouter, {
  title: "Example CRUD API",
  description: "OpenAPI compliant REST API built using tRPC with Express",
  version: "1.0.0",
  baseUrl: `http://localhost:${PORT}/api`,
  tags: [garbageRequestTag],
});

export const getAllGarbageApiMeta: OpenApiMeta = {
  openapi: { method: "GET", path: "/get-garbages", tags: [garbageRequestTag] },
};

export const createGarbageApiMeta: OpenApiMeta = {
  openapi: {
    method: "POST",
    path: "/create-garbage",
    tags: [garbageRequestTag],
  },
};

export const updateGarbageApiMeta: OpenApiMeta = {
  openapi: {
    method: "POST",
    path: "/update-garbage/{id}",
    tags: [garbageRequestTag],
  },
};

export const removeGarbageApiMeta: OpenApiMeta = {
  openapi: {
    method: "GET",
    path: "/remove-garbage/{id}",
    tags: [garbageRequestTag],
  },
};
