const categoryService = require('../services/categoryService');

class CategoryController {
  // Obtener todas las categorías
  async getAll(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await categoryService.getAllCategories({ page, limit });
      res.status(200).json({
        success: true,
        data: result.categories,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener categoría por ID
  async getById(req, res, next) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
