const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { authLimiter } = require('../middleware/rateLimiter');
const {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  resetPasswordValidation,
  requestResetValidation,
} = require('../utils/validators');

const router = express.Router();

// Public routes
router.post(
  '/register',
  authLimiter,
  registerValidation,
  validateRequest,
  authController.register
);

router.post(
  '/login',
  authLimiter,
  loginValidation,
  validateRequest,
  authController.login
);

router.get('/verify-email/:token', authController.verifyEmail);

router.post(
  '/refresh-token',
  validateRequest,
  authController.refreshToken
);

router.post(
  '/request-password-reset',
  authLimiter,
  requestResetValidation,
  validateRequest,
  authController.requestPasswordReset
);

router.post(
  '/reset-password/:token',
  authLimiter,
  resetPasswordValidation,
  validateRequest,
  authController.resetPassword
);

// Protected routes
router.post(
  '/change-password',
  authenticate,
  changePasswordValidation,
  validateRequest,
  authController.changePassword
);

router.post('/logout', authenticate, authController.logout);

module.exports = router;
