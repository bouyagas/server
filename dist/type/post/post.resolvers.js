"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const auth_1 = require("../../utils/auth");
const user_model_1 = require("../user/user.model");
const post_model_1 = require("./post.model");
exports.postsResolvers = {
    Query: {
        post: (_, { id }, ___) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const post = yield post_model_1.Post.findById({ _id: id });
                return post;
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
        posts: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = auth_1.checkAuth(context);
                const posts = yield post_model_1.Post.find({ user: user.id })
                    .sort({ created_at: -1 })
                    .exec();
                return posts;
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
    },
    Mutation: {
        newComment: (_, { input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const usertoken = auth_1.checkAuth(context);
                const user = yield user_model_1.User.findById(usertoken.id).select('-password');
                const post = yield post_model_1.Post.findOne({ user: user.id });
                const newComment = {
                    avatar: user.avatar,
                    text: input.text,
                    user: usertoken.id,
                    username: user.username,
                };
                post.comments.unshift(newComment);
                yield post.save();
                return post;
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
        newPost: (_, { input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const usertoken = auth_1.checkAuth(context);
                console.log(usertoken.username);
                const user = yield user_model_1.User.findById(usertoken.id).select('-password');
                const createPost = new post_model_1.Post({
                    avatar: user.avatar,
                    text: input.text,
                    user: usertoken.id,
                    username: user.username,
                });
                const newPost = yield createPost.save();
                return newPost;
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
        removePost: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = auth_1.checkAuth(context);
                const post = yield post_model_1.Post.findByIdAndRemove({ id, user: user.id });
                if (!post) {
                    throw new apollo_server_1.AuthenticationError('Post not found');
                }
                if (post.user.toString() !== user.id) {
                    throw new apollo_server_1.AuthenticationError('User not authorized');
                }
                return yield post;
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
    },
};
//# sourceMappingURL=post.resolvers.js.map