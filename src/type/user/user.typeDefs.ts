import { gql } from 'apollo-server';

export const usersTypeDefs = gql`
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
