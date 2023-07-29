import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

interface IWorld {
  name: string;
  age: string;
}

async function init() {
  const app = express();
  const PORT = 8080;

  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query{
        hello(name:String, age:Int): String
      }
    `,
    resolvers: {
      Query: {
        hello: (_, data: IWorld) => `Hey ${data.name} is ${data.age}`,
      },
    },
  });

  app.use(express.json());

  await gqlServer.start();

  app.get("/health", (req, res) => {
    res.json({ message: "UP" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log("Server is running at port", PORT);
  });
}

init();
