import { ApolloServer } from "@apollo/server";
import { todos } from "./service/todos";

export async function createGQLServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
      ${todos.typeDefs.types}  
      type Query{
        ${todos.typeDefs.queries}
      }
      type Mutation{
        ${todos.typeDefs.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...todos.resolvers.queries,
      },
      Mutation: {
        ...todos.resolvers.mutations,
      },
    },
  });

  await gqlServer.start();
  return gqlServer;
}
