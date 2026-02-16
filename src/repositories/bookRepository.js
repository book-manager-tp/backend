const Book = require('../models/Book');
const Category = require('../models/Category');
const User = require('../models/User');
const { Op } = require('sequelize');

class BookRepository {
  // Crear libro
  async create(bookData) {
    return await Book.create(bookData);
  }

  // Obtener todos los libros con filtros y paginación
  async findAll(options = {}) {
    const { limit, offset, order, where, categoryId, userId, search } = options;

    const queryOptions = {
      limit,
      offset,
      order: order || [['createdAt', 'DESC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    };

    // Construir condiciones WHERE
    const conditions = [];
    
    if (where) {
      conditions.push(where);
    }
    
    if (categoryId) {
      conditions.push({ categoryId });
    }
    
    if (userId) {
      conditions.push({ userId });
    }
    
    if (search) {
      conditions.push({
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { author: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { isbn: { [Op.like]: `%${search}%` } },
        ],
      });
    }

    if (conditions.length > 0) {
      queryOptions.where = conditions.length === 1 ? conditions[0] : { [Op.and]: conditions };
    }

    return await Book.findAll(queryOptions);
  }

  // Contar libros con filtros
  async count(options = {}) {
    const { where, categoryId, userId, search } = options;

    const conditions = [];
    
    if (where) {
      conditions.push(where);
    }
    
    if (categoryId) {
      conditions.push({ categoryId });
    }
    
    if (userId) {
      conditions.push({ userId });
    }
    
    if (search) {
      conditions.push({
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { author: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { isbn: { [Op.like]: `%${search}%` } },
        ],
      });
    }

    const queryOptions = {};
    if (conditions.length > 0) {
      queryOptions.where = conditions.length === 1 ? conditions[0] : { [Op.and]: conditions };
    }

    return await Book.count(queryOptions);
  }

  // Buscar por ID
  async findById(id) {
    return await Book.findByPk(id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'description'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
  }

  // Buscar por ISBN
  async findByIsbn(isbn) {
    return await Book.findOne({
      where: { isbn },
      include: [
        {
          model: Category,
          as: 'category',
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
  }

  // Actualizar libro
  async update(id, bookData) {
    const book = await this.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    return await book.update(bookData);
  }

  // Eliminar libro
  async delete(id) {
    const book = await this.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    await book.destroy();
    return book;
  }

  // Buscar libros por categoría
  async findByCategory(categoryId, options = {}) {
    return await this.findAll({ ...options, categoryId });
  }

  // Buscar libros por usuario
  async findByUser(userId, options = {}) {
    return await this.findAll({ ...options, userId });
  }
}

module.exports = new BookRepository();
