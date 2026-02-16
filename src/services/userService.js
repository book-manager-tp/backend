const userRepository = require('../repositories/userRepository');

class UserService {
  // Obtener perfil de usuario
  async getUserProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.toPublicJSON();
  }

  // Actualizar perfil de usuario
  async updateUserProfile(userId, updateData) {
    // Remover campos que no deben ser actualizados directamente
    const { password, email, role, isVerified, ...allowedUpdates } = updateData;

    const user = await userRepository.update(userId, allowedUpdates);
    if (!user) {
      throw new Error('User not found');
    }

    return user.toPublicJSON();
  }

  // Obtener todos los usuarios (solo admin)
  async getAllUsers(filter = {}, options = {}) {
    return await userRepository.findAll(filter, options);
  }

  // Obtener usuario por ID (solo admin)
  async getUserById(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.toPublicJSON();
  }

  // Eliminar usuario (solo admin)
  async deleteUser(userId) {
    const user = await userRepository.delete(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  // Actualizar rol de usuario (solo admin)
  async updateUserRole(userId, role) {
    if (!['user', 'admin'].includes(role)) {
      throw new Error('Invalid role');
    }

    const user = await userRepository.update(userId, { role });
    if (!user) {
      throw new Error('User not found');
    }

    return user.toPublicJSON();
  }
}

module.exports = new UserService();
