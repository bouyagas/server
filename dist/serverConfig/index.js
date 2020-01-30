"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const devConfig = require("./dev");
const testConfig = require("./testing");
const env = process.env.NODE_ENV || 'development';
let envConfig = {};
const baseConfig = {
    env,
    isDev: env === 'development',
    isTest: env === 'testing',
    mongoDbUrl: '',
    port: 7000,
    secrets: {
        jwt: process.env.JWT_SECRET,
        jwtExp: '100d',
    },
};
switch (env) {
    case 'dev':
    case 'development':
        envConfig = devConfig.config;
        break;
    case 'test':
    case 'testing':
        envConfig = testConfig.config;
        break;
    default:
        envConfig = devConfig.config;
}
exports.serverConfig = lodash_1.merge(baseConfig, envConfig);
//# sourceMappingURL=index.js.map