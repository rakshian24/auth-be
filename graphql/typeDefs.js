export const typeDefs = `
  type User {
    id: ID
    username: String
    email: String
    todos: [Todo]
  }

  type AuthResponse {
    user: User
    token: String
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
    me: User
    
    todos: [Todo]
    todo(id: ID!): Todo
  }
  
  type Mutation {
    registerUser(registerInput: RegisterInput): AuthResponse
    loginUser(loginInput: LoginInput): AuthResponse
    logOut: String

    createTodo(todoInput: TodoInput): Todo
  }
`;
