const express = require('express');
const bookController = require('../controllers/bookController');
const { authenticate, optionalAuth } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { body, param, query } = require('express-validator');

const router = express.Router();

// Validaciones
const createBookValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),
  body('isbn')
    .optional()
    .trim()
    .matches(/^(?:\d{10}|\d{13})$/)
    .withMessage('ISBN must be 10 or 13 digits'),
  body('description').optional().trim(),
  body('publishedYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() + 1 })
    .withMessage('Invalid published year'),
  body('publisher').optional().trim(),
  body('pages').optional().isInt({ min: 1 }).withMessage('Pages must be at least 1'),
  body('language').optional().trim(),
  body('coverImage').optional().trim().isURL().withMessage('Cover image must be a valid URL'),
  body('available').optional().isBoolean().withMessage('Available must be a boolean'),
  body('categoryId').isInt().withMessage('Valid category ID is required'),
];

const updateBookValidation = [
  param('id').isInt().withMessage('Invalid book ID'),
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),
  body('isbn')
    .optional()
    .trim()
    .matches(/^(?:\d{10}|\d{13})$/)
    .withMessage('ISBN must be 10 or 13 digits'),
  body('description').optional().trim(),
  body('publishedYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() + 1 })
    .withMessage('Invalid published year'),
  body('publisher').optional().trim(),
  body('pages').optional().isInt({ min: 1 }).withMessage('Pages must be at least 1'),
  body('language').optional().trim(),
  body('coverImage').optional().trim().isURL().withMessage('Cover image must be a valid URL'),
  body('available').optional().isBoolean().withMessage('Available must be a boolean'),
  body('categoryId').optional().isInt().withMessage('Invalid category ID'),
];

const idValidation = [param('id').isInt().withMessage('Invalid book ID')];

const categoryIdValidation = [param('categoryId').isInt().withMessage('Invalid category ID')];

// Rutas públicas (solo lectura)
router.get('/', bookController.getAll);

// Rutas protegidas (requieren autenticación obligatoria)
// IMPORTANTE: Esta ruta debe ir ANTES de /:id para evitar conflictos
router.get('/my/books', authenticate, bookController.getMyBooks);

// Más rutas públicas
router.get('/:id', idValidation, validateRequest, bookController.getById);
router.get('/category/:categoryId', categoryIdValidation, validateRequest, bookController.getByCategory);

// Rutas protegidas para crear, actualizar y eliminar
router.post('/', authenticate, createBookValidation, validateRequest, bookController.create);
router.put('/:id', authenticate, updateBookValidation, validateRequest, bookController.update);
router.delete('/:id', authenticate, idValidation, validateRequest, bookController.delete);

module.exports = router;
