import { prisma } from "../../../services/prisma";

interface IData {
  heading: string;
  description: string;
}

const queries = {
  getTodos: async () => {
    const todos = await prisma.todo.findMany();
    return todos;
  },
};

const mutations = {
  createTodo: async (_: any, data: IData) => {
    const result = await prisma.todo.create({ data });
    console.log(result);
    return result;
  },
};

export const resolvers = { mutations, queries };
