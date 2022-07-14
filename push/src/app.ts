import express, { Request, Response } from 'express';
import cors from 'cors';

import { SubscribeRouter } from './routes/subscribeRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/push', (req: Request, res: Response) => {
  res.send('hello typescript express!');
});

app.use('/push/subscribe', SubscribeRouter);
app.use(errorMiddleware);

export default app;
