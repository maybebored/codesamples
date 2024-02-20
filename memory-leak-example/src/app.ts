import express, { Express, Request, Response } from 'express';
import {Logger} from './middleware/logger';

const app: Express = express();

const log = new Logger();

app.get('/info', (_req: Request, res: Response) => {
  const memoryUsage = process.memoryUsage();
  console.log('Memory usage', `${memoryUsage.heapUsed/1024/1024}mB`);
  res.send('Info');
  log.info('info');
});

app.get('/warn', (_req: Request, res: Response) => {
  res.send('Warn');
  log.warn('warn');
});

app.get('/error', (_req: Request, res: Response) => {
  res.send('Error');
  log.error('error');
});

app.get('/debug', (_req: Request, res: Response) => {
  res.send('Debug');
  log.debug('debug');
});

app.use(() => {

})

export default app;
