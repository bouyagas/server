"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_resolvers_1 = require("./post/post.resolvers");
const post_typeDefs_1 = require("./post/post.typeDefs");
const profile_resolvers_1 = require("./profile/profile.resolvers");
const profile_typeDefs_1 = require("./profile/profile.typeDefs");
const user_resolvers_1 = require("./user/user.resolvers");
const user_typeDefs_1 = require("./user/user.typeDefs");
exports.resolvers = {
    Query: Object.assign(Object.assign(Object.assign({}, post_resolvers_1.postsResolvers.Query), profile_resolvers_1.profilesResolvers.Query), user_resolvers_1.usersResolvers.Query),
    Mutation: Object.assign(Object.assign(Object.assign({}, post_resolvers_1.postsResolvers.Mutation), profile_resolvers_1.profilesResolvers.Mutation), user_resolvers_1.usersResolvers.Mutation),
};
exports.typeDefs = [post_typeDefs_1.postsTypeDefs, profile_typeDefs_1.profilesTypeDefs, user_typeDefs_1.usersTypeDefs];
//# sourceMappingURL=root.js.map