import express from 'express';

import {
  register,
  login,
  logout,
  getMyProfile,
  protect,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMyProfile);

export default router;
