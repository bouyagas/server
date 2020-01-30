import * as mongoose from 'mongoose';
import { serverConfig } from './index';

export const connect = async (url: string = serverConfig.mongoDbUrl, opts = {}): Promise<void> => {
  try {
    await mongoose.connect(url, {
      ...opts,
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
