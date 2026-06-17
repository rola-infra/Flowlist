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

const router = express.Router();

//router.get('/', getTasks);
//router.patch('/:id', updateTask);
//router.delete('/:id', deleteTask);
//router.post('/', createTask);

router.route('/').get(protect, getTasks).post(protect, createTask);
router.route('/stats').get(protect, getTaskStats);
router
  .route('/:id')
  .patch(protect, updateTask)
  .delete(protect, deleteTask)
  .get(protect, getTaskById);
export default router;
