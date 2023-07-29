import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { createGQLServer } from "./graphql";

async function init() {
  const app = express();
  const PORT = 8080;

  const gqlServer = await createGQLServer();

  app.use(express.json());

  app.get("/health", (_, res) => res.json({ message: "UP" }));

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log("Server is running at port", PORT);
  });
}

init();
