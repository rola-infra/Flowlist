import express from 'express';
import { validate } from '../middleware/validate.middleware.js';

import {
  register,
  login,
  logout,
  getMyProfile,
  protect,
} from '../controllers/auth.controller.js';
import { signupSchema, loginSchema } from '../validators/task.validator.js';

const router = express.Router();

router.post('/signup', validate(signupSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.get('/me', protect, getMyProfile);

export default router;
