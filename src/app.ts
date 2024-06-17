import express from 'express';
import { router as usersRouter } from './routers/users/users';
import { router as authRouther } from './routers/authentication/authentication';
import { router as todosRouter } from './routers/todos/todos';
import { errorManager } from './middlewares/error/errorManager';
import * as OpenApiValidator from 'express-openapi-validator';
import morgan from 'morgan';

export const app = express();

app.use(express.json());
app.use(
  OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: {
      removeAdditional: 'all',
    },
    // ignoreUndocumented: true,
  }),
);
app.use(morgan('dev'));
app.use('/auth', authRouther);
app.use('/users', usersRouter);
app.use('/todos', todosRouter);
app.use(errorManager);
