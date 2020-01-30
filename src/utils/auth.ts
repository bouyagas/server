import { AuthenticationError } from 'apollo-server';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';

export const createToken = ({ id }: any) =>
  jwt.sign({ id }, config.get('jwtSecret.jwt'), { expiresIn: 360000 });

export const checkAuth = (context: any) => {
  // context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, config.get('jwtSecret.jwt'));
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error('Authentication token must be Bearer [token]');
  }
  throw new Error('Authorization header must be provided');
};
