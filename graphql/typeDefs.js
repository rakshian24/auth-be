export const typeDefs = `
  type User {
    id: ID
    username: String
    email: String
    todos: [Todo]
  }

  type Todo {
    id: ID
    title: String
    description: String
    isCompleted: Boolean
    ownerId: ID
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

  input TodoInput {
    title: String!
    description: String!
    isCompleted: Boolean!
  }
  
  type Query {
    user(id: ID!): User
    allUsers: [User]
    
    todos: [Todo]
    todo(id: ID!): Todo
  }
  
  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    logOut: String

    createTodo(todoInput: TodoInput): Todo
  }
`;
