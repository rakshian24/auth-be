const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const { ApolloServer } = require("apollo-server");
const { connectDB } = require("./db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

connectDB();
const { SERVER_PORT } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: SERVER_PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
