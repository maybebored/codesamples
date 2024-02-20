import app from './app';
import { Logger } from './middleware/logger';

const log = new Logger();

const server = app.listen(4000, () => {
  log.debug('Server is running', {port: 4000});
});

process.on('SIGTERM', () => {
  log.info('SIGTERM signal received.');
  log.info('Closing http server.');
  server.close((err) => {
    log.info('Http server closed.');
    process.exit(err ? 1 : 0);
  });
});
