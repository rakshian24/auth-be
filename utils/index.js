import jwt from "jsonwebtoken";
import { AUTH_COOKIE_NAME } from "../constants/index.js";
import { ApolloError } from "apollo-server-errors";
import User from "../models/User.js";

export const generateToken = async (ctx, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });

  await ctx.request.cookieStore?.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict",
    maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
  });
};

export const protectApi = async (ctx) => {
  return new Promise(async (resolve, reject) => {
    const cookieObj = await ctx?.request?.cookieStore?.get(AUTH_COOKIE_NAME);
    const token = cookieObj?.value;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        ctx.request.user = await User.findById(decoded.userId);
        resolve();
      } catch (error) {
        console.error(error);
        reject(`Not authorized, no token`, "NOT_AUTHORISED");
      }
    } else {
      reject(`Not authorized, no token`, "NOT_AUTHORISED");
    }
  });
};
