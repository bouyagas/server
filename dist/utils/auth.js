"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const config = require("config");
const jwt = require("jsonwebtoken");
exports.createToken = ({ id }) => jwt.sign({ id }, config.get('jwtSecret.jwt'), { expiresIn: 360000 });
exports.checkAuth = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, config.get('jwtSecret.jwt'));
                return user;
            }
            catch (err) {
                throw new apollo_server_1.AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be Bearer [token]');
    }
    throw new Error('Authorization header must be provided');
};
//# sourceMappingURL=auth.js.map