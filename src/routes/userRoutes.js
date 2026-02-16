const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const {
  updateProfileValidation,
} = require('../utils/validators');

const router = express.Router();

// Protected routes - Usuario autenticado
router.get('/profile', authenticate, userController.getProfile);

router.put(
  '/profile',
  authenticate,
  updateProfileValidation,
  validateRequest,
  userController.updateProfile
);

module.exports = router;
