import userResolvers from "./users.js";
import todoResolvers from "./todo.js";

export default {
  Query: {
    ...userResolvers.Query,
    ...todoResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...todoResolvers.Mutation,
  },
};
