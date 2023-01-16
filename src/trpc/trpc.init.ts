import { initTRPC } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.meta<OpenApiMeta>().create();

export const router = t.router;
export const middleware = t.middleware;
export const procedure = t.procedure;
