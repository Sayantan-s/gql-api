const types = `#graphql
    type Todo{
        id: ID!
        heading: String
        description: String
        createdAt: String
        updatedAt: String
    }
`;

const queries = `#graphql
    getTodos: [Todo]
`;
const mutations = `#graphql
    createTodo(heading:String!,description:String!): Todo
`;

export const typeDefs = { queries, mutations, types };
