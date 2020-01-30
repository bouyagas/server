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
const gravatar = require("gravatar");
const auth_1 = require("../../utils/auth");
const validators_1 = require("../../utils/validators");
const user_model_1 = require("./user.model");
exports.usersResolvers = {
    Query: {
        me: (_, ___, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = auth_1.checkAuth(context);
                console.log(user.id);
                return yield user_model_1.User.findOne({ _id: user.id });
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
    },
    Mutation: {
        login: (_, { input: { username, password, email } }, ___) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { errors, valid } = validators_1.validateSignInInput(username, email, password);
                if (!valid) {
                    throw new apollo_server_1.UserInputError('Errors', { errors });
                }
                const user = yield user_model_1.User.findOne({ email });
                if (!user) {
                    errors.general = 'User not found';
                    throw new apollo_server_1.UserInputError('User not found', { errors });
                }
                const match = yield user.comparePassword(password);
                if (!match) {
                    errors.general = 'Wrong crendetials';
                    throw new apollo_server_1.UserInputError('Wrong crendetials', { errors });
                }
                const token = auth_1.createToken(user);
                return { token, user };
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
        register: (_, { input: { username, email, password, confirmPassword } }, ___) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { valid, errors } = validators_1.validateSignUpInput(username, email, password, confirmPassword);
                if (!valid) {
                    throw new apollo_server_1.UserInputError('Errors', { errors });
                }
                const existingUser = yield user_model_1.User.findOne({ email });
                if (existingUser) {
                    throw new apollo_server_1.UserInputError('Email is taken', {
                        errors: {
                            email: 'User already exists',
                        },
                    });
                }
                const avatar = gravatar.url(email, {
                    d: 'mm',
                    r: 'pg',
                    s: '200',
                });
                const user = yield user_model_1.User.create({ username, email, password, avatar });
                const token = auth_1.createToken(user);
                return { token, user };
            }
            catch (err) {
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
        updateMe: (_, { input }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = auth_1.checkAuth(context);
                return yield user_model_1.User.findOneAndUpdate({ _id: user.id }, input, { new: true })
                    .select('-password')
                    .lean()
                    .exec();
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
    },
};
//# sourceMappingURL=user.resolvers.js.map