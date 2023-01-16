import express from "express";

import * as dotenv from "dotenv";
import { GarbageStorage } from "./storage/garbage.storage";
import * as trpcExpress from "@trpc/server/adapters/express";
import { openApiDocument, trpcRouter } from "./routers/route";

import cors from "cors";
import { createOpenApiExpressMiddleware } from "trpc-openapi";

import * as swaggerUi from "swagger-ui-express";

dotenv.config();

const port = process.env.PORT || 3000;

export const garbageStorage = new GarbageStorage();

const app = express();

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

app.use(cors());

app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
    createContext,
  })
);

// Handle incoming OpenAPI requests
app.use(
  "/api",
  createOpenApiExpressMiddleware({ router: trpcRouter, createContext })
);

// Serve Swagger UI with our OpenAPI schema
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(openApiDocument));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
