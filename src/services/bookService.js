const bookRepository = require('../repositories/bookRepository');
const categoryRepository = require('../repositories/categoryRepository');

const userRepository = require('../repositories/userRepository');

class BookService {
  // Crear libro
  async createBook(bookData, userId, userName) {
    // Verificar que la categoría existe
    const category = await categoryRepository.findById(bookData.categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    // Verificar si ya existe un libro con el mismo ISBN (si se proporciona)
    if (bookData.isbn) {
      const existingBook = await bookRepository.findByIsbn(bookData.isbn);
      if (existingBook) {
        throw new Error('A book with this ISBN already exists');
      }
    }

    // Crear libro asignándolo al usuario autenticado y usando su nombre como autor
    const book = await bookRepository.create({
      ...bookData,
      author: userName, // El autor es el nombre del usuario autenticado
      userId,
    });

    return book.toPublicJSON();
  }

  // Obtener todos los libros con filtros y paginación
  async getAllBooks(options = {}) {
    const { page = 1, limit = 10, categoryId, userId, search } = options;
    const offset = (page - 1) * limit;

    const books = await bookRepository.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      categoryId,
      userId,
      search,
    });

    const total = await bookRepository.count({ categoryId, userId, search });

    return {
      books: books.map((b) => b.toPublicJSON()),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Obtener libro por ID
  async getBookById(id) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book.toPublicJSON();
  }

  // Actualizar libro
  async updateBook(id, bookData, userId) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }

    // Verificar permisos: solo el creador puede actualizar
    if (book.userId && book.userId !== userId) {
      console.log(`User ${userId} attempted to update book ${id} owned by user ${book.userId}`);
      throw new Error('You do not have permission to update this book');
    }

    // Si se actualiza la categoría, verificar que existe
    if (bookData.categoryId && bookData.categoryId !== book.categoryId) {
      const category = await categoryRepository.findById(bookData.categoryId);
      if (!category) {
        throw new Error('Category not found');
      }
    }

    // Si se actualiza el ISBN, verificar que no exista en otro libro
    if (bookData.isbn && bookData.isbn !== book.isbn) {
      const existingBook = await bookRepository.findByIsbn(bookData.isbn);
      if (existingBook && existingBook.id !== parseInt(id)) {
        throw new Error('A book with this ISBN already exists');
      }
    }

    const updatedBook = await bookRepository.update(id, bookData);
    return updatedBook.toPublicJSON();
  }

  // Eliminar libro
  async deleteBook(id, userId) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }

    // Verificar permisos: solo el creador puede eliminar su libro
    if (book.userId !== userId) {
      console.log(`User ${userId} attempted to delete book ${id} owned by user ${book.userId}`);
      throw new Error('You do not have permission to delete this book');
    }

    const deletedBook = await bookRepository.delete(id);
    return deletedBook.toPublicJSON();
  }

  // Obtener libros por categoría
  async getBooksByCategory(categoryId, options = {}) {
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    // Verificar que la categoría existe
    const category = await categoryRepository.findById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    const books = await bookRepository.findByCategory(categoryId, {
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const total = await bookRepository.count({ categoryId });

    return {
      books: books.map((b) => b.toPublicJSON()),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Obtener libros del usuario autenticado
  async getMyBooks(userId, options = {}) {
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    const books = await bookRepository.findByUser(userId, {
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const total = await bookRepository.count({ userId });

    return {
      books: books.map((b) => b.toPublicJSON()),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
}

module.exports = new BookService();
