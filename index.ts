import express from "express";

import * as dotenv from "dotenv";
import { GarbageStorage } from "./garbage.storage";
import * as trpcExpress from "@trpc/server/adapters/express";
import { trpcRouter } from "./route";

import cors from "cors";

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
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
    createContext,
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
