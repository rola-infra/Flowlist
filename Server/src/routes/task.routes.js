import express from 'express';
import {
  getTasks,
  updateTask,
  deleteTask,
  createTask,
} from '../controllers/task.controller.js';

const router = express.Router();

//router.get('/', getTasks);
//router.patch('/:id', updateTask);
//router.delete('/:id', deleteTask);
//router.post('/', createTask);

router.route('/').get(getTasks).post(createTask);
router.route('/:id').patch(updateTask).delete(deleteTask);
export default router;
