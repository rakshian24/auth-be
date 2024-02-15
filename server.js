import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { typeDefs } from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
import { connectDB } from "./db/index.js";

connectDB();
const { SERVER_PORT } = process.env;

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  cors: {
    origin: "https://raksh-auth-fe.vercel.app",
    credentials: true,
    methods: ["POST"],
    allowedHeaders: ["X-Custom-Header"],
  },
});

const server = createServer(yoga);

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});
