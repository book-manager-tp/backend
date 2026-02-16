// Este archivo define las relaciones entre modelos
const User = require('./User');
const Category = require('./Category');
const Book = require('./Book');

// Definir relaciones
Book.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Book.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Category.hasMany(Book, { foreignKey: 'categoryId', as: 'books' });
User.hasMany(Book, { foreignKey: 'userId', as: 'books' });

module.exports = {
  User,
  Category,
  Book,
};
