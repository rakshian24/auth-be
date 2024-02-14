import { ApolloError } from "apollo-server-errors";
import { protectApi } from "../../utils/index.js";
import Todo from "../../models/Todo.js";

export default {
  Mutation: {
    async createTodo(
      _,
      { todoInput: { title, description, isCompleted } },
      ctx
    ) {
      try {
        await protectApi(ctx);
      } catch (error) {
        throw new ApolloError(`Not Authorised`, `NOT_AUTHORISED`);
      }
      const newTodo = await Todo.create({
        title,
        description,
        isCompleted,
        ownerId: ctx.request.user._id,
      });

      return newTodo;
    },
  },
  Query: {
    async todo(_, { id }, ctx) {
      try {
        await protectApi(ctx);
      } catch (error) {
        throw new ApolloError(`Not Authorised`, `NOT_AUTHORISED`);
      }

      const todo = await Todo.findOne({
        _id: id,
        ownerId: ctx.request.user._id,
      });

      return todo;
    },

    async todos(_, args, ctx) {
      try {
        await protectApi(ctx);
      } catch (error) {
        throw new ApolloError(`Not Authorised`, `NOT_AUTHORISED`);
      }

      const todos = await Todo.find({ ownerId: ctx.request.user._id });

      return todos;
    },
  },
};
