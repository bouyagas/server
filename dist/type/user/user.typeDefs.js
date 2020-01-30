"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.usersTypeDefs = apollo_server_1.gql `
  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
  }

  type AuthUser {
    token: String!
    user: User
  }
  input RegisterInput {
    username: String!
    email: String!
    avatar: String
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String!
    email: String
  }

  type Query {
    me: User!
  }

  type Mutation {
    register(input: RegisterInput!): AuthUser!
    login(input: LoginInput!): AuthUser!
    updateMe(input: UpdateUserInput!): User
  }
`;
//# sourceMappingURL=user.typeDefs.js.map