import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import {
  getTasks,
  getTaskStats,
  getTaskById,
  updateTask,
  deleteTask,
  createTask,
} from '../controllers/task.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createTaskSchema,
  updateTaskSchema,
} from '../validators/task.validator.js';

const router = express.Router();

//router.get('/', getTasks);
//router.patch('/:id', updateTask);
//router.delete('/:id', deleteTask);
//router.post('/', createTask);

router
  .route('/')
  .get(protect, getTasks)
  .post(protect, validate(createTaskSchema), createTask);
router.route('/stats').get(protect, getTaskStats);
router
  .route('/:id')
  .patch(protect, validate(updateTaskSchema), updateTask)
  .delete(protect, deleteTask)
  .get(protect, getTaskById);
export default router;
