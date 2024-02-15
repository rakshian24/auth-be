import Todo from "../../models/Todo.js";
import getLoggedInUserId from "../../middleware/getLoggedInUserId.js";

export default {
  Mutation: {
    async createTodo(
      _,
      { todoInput: { title, description, isCompleted } },
      ctx
    ) {
      const loggedInUserId = getLoggedInUserId(ctx);
      const userId = loggedInUserId?.userId;

      const newTodo = await Todo.create({
        title,
        description,
        isCompleted,
        ownerId: userId,
      });

      return { ...newTodo._doc, id: newTodo._id };
    },
  },
  Query: {
    async todo(_, { id }, ctx) {
      const loggedInUserId = getLoggedInUserId(ctx);
      const userId = loggedInUserId?.userId;

      const todo = await Todo.findOne({
        _id: id,
        ownerId: userId,
      });

      return todo;
    },

    async todos(_, args, ctx) {
      const loggedInUserId = getLoggedInUserId(ctx);
      const userId = loggedInUserId?.userId;

      const todos = await Todo.find({ ownerId: userId });

      return todos;
    },
  },
};
