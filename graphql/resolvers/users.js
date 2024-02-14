const { ApolloError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../../utils/index");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    async registerUser(
      _,
      { registerInput: { email, username, password, confirmPassword } }
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

      console.log("useruser = ", JSON.stringify(user, undefined, 2));

      if (user) {
        generateToken(res, user._id);
        return {
          id: user._id,
          ...user,
        };
      } else {
        throw new ApolloError(`Invalid user`, "INVALID_USER");
      }
    },

    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        return {
          id: user._id,
          ...user,
        };
      } else {
        throw new ApolloError(
          `Invalid email or password`,
          "INVALID_EMAIL_OR_PASSWORD"
        );
      }
    },
  },
  Query: {
    user: (_, { ID }) => User.findById(ID),
  },
};
