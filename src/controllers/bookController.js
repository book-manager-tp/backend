const bookService = require('../services/bookService');

class BookController {
  // Crear libro
  async create(req, res, next) {
    try {
      const { userId, name } = req.user; // Obtenido del middleware de autenticación
      const book = await bookService.createBook(req.body, userId, name);
      res.status(201).json({
        success: true,
        data: book,
        message: 'Book created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener todos los libros
  async getAll(req, res, next) {
    try {
      const { page, limit, categoryId, userId, search } = req.query;
      const result = await bookService.getAllBooks({
        page,
        limit,
        categoryId,
        userId,
        search,
      });
      res.status(200).json({
        success: true,
        data: result.books,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener libro por ID
  async getById(req, res, next) {
    try {
      const book = await bookService.getBookById(req.params.id);
      res.status(200).json({
        success: true,
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }

  // Actualizar libro
  async update(req, res, next) {
    try {
      const userId = req.user.userId;
      const book = await bookService.updateBook(req.params.id, req.body, userId);
      res.status(200).json({
        success: true,
        data: book,
        message: 'Book updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // Eliminar libro
  async delete(req, res, next) {
    try {
      const userId = req.user.userId; 
      const book = await bookService.deleteBook(req.params.id, userId);
      res.status(200).json({
        success: true,
        data: book,
        message: 'Book deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener libros por categoría
  async getByCategory(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await bookService.getBooksByCategory(req.params.categoryId, {
        page,
        limit,
      });
      res.status(200).json({
        success: true,
        data: result.books,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener mis libros (del usuario autenticado)
  async getMyBooks(req, res, next) {
    try {
      const userId = req.user.userId;
      const { page, limit } = req.query;
      const result = await bookService.getMyBooks(userId, { page, limit });
      res.status(200).json({
        success: true,
        data: result.books,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookController();
