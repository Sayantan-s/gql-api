import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { prisma } from "./services/prisma";

interface IWorld {
  name: string;
  age: string;
}

interface IData {
  heading: string;
  description: string;
}

async function init() {
  const app = express();
  const PORT = 8080;

  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query{
        test(name:String, age:Int): String
      }
      type Mutation{
        createTodo(heading:String!,description:String!): Boolean
      }
    `,
    resolvers: {
      Query: {
        test: (_, data: IWorld) => `Hey ${data.name} is ${data.age}`,
      },
      Mutation: {
        createTodo: async (_, data: IData) => {
          await prisma.todo.create({ data });
          return true;
        },
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
