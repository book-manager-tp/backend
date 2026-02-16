const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Book = sequelize.define(
  'Book',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title is required',
        },
        len: {
          args: [1, 255],
          msg: 'Title must be between 1 and 255 characters',
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Author is required',
        },
      },
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        is: {
          args: /^(?:\d{10}|\d{13})$/,
          msg: 'ISBN must be 10 or 13 digits',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: 1000,
          msg: 'Published year must be after year 1000',
        },
        max: {
          args: new Date().getFullYear() + 1,
          msg: 'Published year cannot be in the future',
        },
      },
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: 1,
          msg: 'Pages must be at least 1',
        },
      },
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'Spanish',
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          msg: 'Cover image must be a valid URL',
        },
      },
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    timestamps: true,
    tableName: 'books',
  }
);

// Método para devolver JSON público
Book.prototype.toPublicJSON = function () {
  return {
    id: this.id,
    title: this.title,
    author: this.author,
    isbn: this.isbn,
    description: this.description,
    publishedYear: this.publishedYear,
    publisher: this.publisher,
    pages: this.pages,
    language: this.language,
    coverImage: this.coverImage,
    available: this.available,
    categoryId: this.categoryId,
    userId: this.userId,
    category: this.category,
    user: this.user,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = Book;
