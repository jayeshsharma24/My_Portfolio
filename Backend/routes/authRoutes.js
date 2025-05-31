import express from 'express';
import createUserModel from '../models/UserModel.js';
import { signup, login, verifyOtp, forgotPassword, resetPassword } from '../controllers/authController.js';

const createAuthRoutes = (authDb) => {
  const router = express.Router();
  const User = createUserModel(authDb); // Pass DB to model factory

  router.post('/signup', signup(User));
  router.post('/login', login(User));
  router.post('/verify-otp', verifyOtp(User));
  router.post('/forgot-password', forgotPassword(User));
  router.post('/reset-password', resetPassword(User));

  return router;
};

export default createAuthRoutes;
