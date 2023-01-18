import express from "express";

import * as dotenv from "dotenv";
import { GarbageStorage } from "./storage/garbage.db.service";
import * as trpcExpress from "@trpc/server/adapters/express";
import { trpcRouter } from "./routers/route";

import cors from "cors";
import {
  createOpenApiExpressMiddleware,
  generateOpenApiDocument,
} from "trpc-openapi";

import * as swaggerUi from "swagger-ui-express";

dotenv.config();

const PORT = 3000;

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

const restDocument = generateOpenApiDocument(trpcRouter, {
  title: "Example CRUD API",
  description: "OpenAPI compliant REST API built using tRPC with Express",
  version: "1.0.0",
  baseUrl: `http://localhost:3000/api`,
  tags: ["garbage"],
});

// Serve Swagger UI with our OpenAPI schema
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(restDocument));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
