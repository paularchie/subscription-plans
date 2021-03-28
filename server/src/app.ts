import express from 'express';
import { NotFoundError } from './common/errors/not-found-error';
import { errorHandler } from './common/middlewares/error-handler';
import { subscriptionsRouter } from './routes';

const app = express();

app.use(subscriptionsRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };

