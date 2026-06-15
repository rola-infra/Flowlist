import express from 'express';
import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());

app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/auth', authRoutes);

export default app;
