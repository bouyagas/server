import { postsResolvers } from './post/post.resolvers';
import { postsTypeDefs } from './post/post.typeDefs';
import { profilesResolvers } from './profile/profile.resolvers';
import { profilesTypeDefs } from './profile/profile.typeDefs';
import { usersResolvers } from './user/user.resolvers';
import { usersTypeDefs } from './user/user.typeDefs';

export const resolvers = {
  Query: {
    ...postsResolvers.Query,
    ...profilesResolvers.Query,
    ...usersResolvers.Query,
  },
  // tslint:disable-next-line: object-literal-sort-keys
  Mutation: {
    ...postsResolvers.Mutation,
    ...profilesResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};

export const typeDefs = [postsTypeDefs, profilesTypeDefs, usersTypeDefs];
