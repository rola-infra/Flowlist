import express from 'express';
import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';
import { globalErrorHandler } from './controllers/error.controller.js';

const app = express();

app.use(express.json());
app.set('query parser', 'extended');

app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(globalErrorHandler);

export default app;
