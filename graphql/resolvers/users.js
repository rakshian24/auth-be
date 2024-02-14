import { ApolloError } from "apollo-server-errors";
import { generateToken, protectApi } from "../../utils/index.js";
import User from "../../models/User.js";
import { AUTH_COOKIE_NAME } from "../../constants/index.js";

export default {
  Mutation: {
    async registerUser(
      _,
      { registerInput: { email, username, password, confirmPassword } },
      ctx
    ) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        throw new ApolloError(
          `A user is already registered with the email ${email}`,
          "USER_ALREADY_EXISTS"
        );
      }

      const user = await User.create({
        username,
        email,
        password,
        confirmPassword,
      });

      if (user) {
        generateToken(ctx, user._id);
        return user;
      } else {
        throw new ApolloError(`Invalid user`, "INVALID_USER");
      }
    },

    async loginUser(_, { loginInput: { email, password } }, ctx) {
      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        generateToken(ctx, user._id);

        return user;
      } else {
        throw new ApolloError(
          `Invalid email or password`,
          "INVALID_EMAIL_OR_PASSWORD"
        );
      }
    },

    async logOut(_, args, ctx) {
      await ctx.request.cookieStore?.delete({
        name: AUTH_COOKIE_NAME,
      });
      return "Logged out successfully!";
    },
  },
  Query: {
    async user(_, { id }, ctx) {
      protectApi(ctx);

      const user = await User.findById(id);
      return user;
    },

    async allUsers(_, args, ctx) {
      protectApi(ctx);

      const users = await User.find();
      return users;
    },
  },
};
