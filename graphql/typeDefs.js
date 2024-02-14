export const typeDefs = `
  type User {
    username: String
    email: String
    id: String
  }
  
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  
  input LoginInput {
    email: String!
    password: String!
  }
  
  type Query {
    user(id: ID!): User
    allUsers: [User]!
  }
  
  type Mutation {
    registerUser(registerInput: RegisterInput): User!
    loginUser(loginInput: LoginInput): User!
    logOut: String!
  }
`;
