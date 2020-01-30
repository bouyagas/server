import { gql } from 'apollo-server';

export const postsTypeDefs = gql`
  type Post {
    id: ID!
    username: String
    text: String!
    avatar: String
    comments: [Comment]!
  }

  type Comment {
    username: String
    text: String!
    avatar: String
  }

  input CommentInput {
    username: String
    text: String!
    avatar: String
  }

  input NewPostInput {
    text: String!
    username: String
    avatar: String
  }

  extend type Query {
    post(id: ID!): Post!
    posts: [Post]!
  }

  extend type Mutation {
    newComment(input: CommentInput!): Post!
    newPost(input: NewPostInput!): Post!
    removePost(id: ID!): Post!
  }
`;
