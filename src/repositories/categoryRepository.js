const Category = require('../models/Category');

class CategoryRepository {
  // Obtener todas las categorías
  async findAll(options = {}) {
    const { limit, offset, order } = options;
    return await Category.findAll({
      limit,
      offset,
      order: order || [['name', 'ASC']],
    });
  }

  // Contar total de categorías
  async count() {
    return await Category.count();
  }

  // Buscar por ID
  async findById(id) {
    return await Category.findByPk(id);
  }

  // Buscar por nombre (usado en seedData)
  async findByName(name) {
    return await Category.findOne({
      where: { name },
    });
  }
}

module.exports = new CategoryRepository();
