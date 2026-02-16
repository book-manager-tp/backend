const express = require('express');
const categoryController = require('../controllers/categoryController');
const { validateRequest } = require('../middleware/validateRequest');
const { param } = require('express-validator');

const router = express.Router();

// Validaciones
const idValidation = [param('id').isInt().withMessage('Invalid category ID')];

// Rutas públicas (solo lectura)
router.get('/', categoryController.getAll);
router.get('/:id', idValidation, validateRequest, categoryController.getById);

module.exports = router;
