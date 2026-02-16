const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const bookRoutes = require('./bookRoutes');

const router = express.Router();

// Rutas principales
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/books', bookRoutes);

// Ruta de bienvenida
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the API',
    version: '1.0.0',
  });
});

module.exports = router;
