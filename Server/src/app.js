import express from 'express';
import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';
import { globalErrorHandler } from './controllers/error.controller.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();

app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.set('query parser', 'extended');
app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: req.query, // capture the parsed query once
    writable: true,
    enumerable: true,
    configurable: true,
  });
  next();
});
//app.use(hpp());
app.use(mongoSanitize());

app.use((req, res, next) => {
  console.log(req.query);
  next();
});

app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(globalErrorHandler);

export default app;
