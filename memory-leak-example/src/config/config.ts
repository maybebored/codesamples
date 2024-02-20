import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const config = {
  logLevel: process.env['LOG_LEVEL'],
  logBufferUntilLevel: process.env['LOG_BUFFER_UNTIL_LEVEL'],
};

export default config;
