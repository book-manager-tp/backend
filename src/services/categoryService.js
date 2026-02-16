const categoryRepository = require('../repositories/categoryRepository');

class CategoryService {
  // Obtener todas las categorías
  async getAllCategories(options = {}) {
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    const categories = await categoryRepository.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const total = await categoryRepository.count();

    return {
      categories: categories.map((c) => c.toPublicJSON()),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Obtener categoría por ID
  async getCategoryById(id) {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category.toPublicJSON();
  }
}

module.exports = new CategoryService();
