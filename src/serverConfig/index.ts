import { merge } from 'lodash';
import * as devConfig from './dev';
import * as testConfig from './testing';

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

export const serverConfig = merge(baseConfig, envConfig);
