import { ApolloServer } from "@apollo/server";
import { prisma } from "../services/prisma";

interface IWorld {
  name: string;
  age: string;
}

interface IData {
  heading: string;
  description: string;
}

export async function createGQLServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query{
        getTodos: String
      }
      type Mutation{
        createTodo(heading:String!,description:String!): Boolean
      }
    `,
    resolvers: {
      Query: {
        getTodos: () => `Hello World`,
      },
      Mutation: {
        createTodo: async (_, data: IData) => {
          await prisma.todo.create({ data });
          return true;
        },
      },
    },
  });

  await gqlServer.start();
  return gqlServer;
}
