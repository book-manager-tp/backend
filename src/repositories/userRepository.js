const User = require('../models/User');
const { Op } = require('sequelize');

class UserRepository {
  // Crear nuevo usuario
  async create(userData) {
    return await User.create(userData);
  }

  // Buscar usuario por email
  async findByEmail(email) {
    return await User.findOne({ 
      where: { email },
      attributes: { exclude: ['password'] }
    });
  }

  // Buscar usuario por email con password
  async findByEmailWithPassword(email) {
    return await User.findOne({ where: { email } });
  }

  // Buscar usuario por ID
  async findById(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
  }

  // Buscar todos los usuarios
  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 10, sort = '-createdAt' } = options;
    const offset = (page - 1) * limit;

    // Convertir sort string a array de Sequelize
    const order = sort.startsWith('-') 
      ? [[sort.substring(1), 'DESC']]
      : [[sort, 'ASC']];

    const { count, rows: users } = await User.findAndCountAll({
      where: filter,
      order,
      offset,
      limit,
      attributes: { exclude: ['password'] }
    });

    return {
      users,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit),
      },
    };
  }

  // Actualizar usuario
  async update(id, updateData) {
    const user = await User.findByPk(id);
    if (!user) return null;
    
    return await user.update(updateData);
  }

  // Eliminar usuario
  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    
    await user.destroy();
    return user;
  }

  // Buscar por token de verificacion
  async findByVerificationToken(token) {
    return await User.findOne({
      where: {
        verificationToken: token,
        verificationTokenExpires: { [Op.gt]: new Date() },
      },
    });
  }

  // Buscar por token de reset password
  async findByResetToken(token) {
    return await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });
  }

  // Verificar usuario
  async verifyUser(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    
    return await user.update({
      isVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    });
  }
}

module.exports = new UserRepository();
