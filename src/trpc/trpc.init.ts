import { initTRPC } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";

export const { router, middleware, procedure } = initTRPC
  .meta<OpenApiMeta>()
  .create();
