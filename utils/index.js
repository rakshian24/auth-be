import jwt from "jsonwebtoken";

export const generateToken = async (ctx, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });

  await ctx.request.cookieStore?.set({
    name: "rakshAppToken",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict",
    maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
  });
};
