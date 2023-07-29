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
    await prisma.todo.create({ data });
    return true;
  },
};

export const resolvers = { mutations, queries };
