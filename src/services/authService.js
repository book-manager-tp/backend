const userRepository = require('../repositories/userRepository');
const jwtUtil = require('../utils/jwt');
const emailUtil = require('../utils/email');
const crypto = require('crypto');

class AuthService {
  // Registrar nuevo usuario
  async register(userData) {
    // Verificar si el usuario ya existe
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Generar token de verificacion
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 horas

    // Crear usuario
    const user = await userRepository.create({
      ...userData,
      verificationToken,
      verificationTokenExpires,
    });

    // Intentar enviar email de verificacion
    try {
      await emailUtil.sendVerificationEmail(user.email, verificationToken);
    } catch (emailError) {
      // Si falla el envío del email, eliminar el usuario creado
      await userRepository.delete(user.id);
      throw new Error('Failed to send verification email. Please try again later.');
    }

    return {
      user: user.toPublicJSON(),
      message: 'User registered successfully. Please check your email to verify your account.',
    };
  }

  // Login
  async login(email, password) {
    // Buscar usuario con password
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verificar password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Verificar si el usuario esta verificado
    if (!user.isVerified) {
      throw new Error('Please verify your email before logging in');
    }

    // Generar tokens
    const accessToken = jwtUtil.generateAccessToken(user);
    const refreshToken = jwtUtil.generateRefreshToken(user);

    return {
      user: user.toPublicJSON(),
      accessToken,
      refreshToken,
    };
  }

  // Verificar email
  async verifyEmail(token) {
    const user = await userRepository.findByVerificationToken(token);
    if (!user) {
      throw new Error('Invalid or expired verification token');
    }

    await userRepository.verifyUser(user.id);

    return { message: 'Email verified successfully' };
  }

  // Refresh token
  async refreshToken(refreshToken) {
    const decoded = jwtUtil.verifyRefreshToken(refreshToken);
    const user = await userRepository.findById(decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = jwtUtil.generateAccessToken(user);

    return { accessToken };
  }

  // Solicitar reset de password
  async requestPasswordReset(email) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      // Por seguridad, no revelar si el email existe
      return { message: 'If the email exists, you will receive a password reset link' };
    }

    // Generar token de reset
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hora

    await userRepository.update(user.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetTokenExpires,
    });

    // Enviar email
    await emailUtil.sendPasswordResetEmail(user.email, resetToken);

    return { message: 'If the email exists, you will receive a password reset link' };
  }

  // Reset password
  async resetPassword(token, newPassword) {
    const user = await userRepository.findByResetToken(token);
    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return { message: 'Password reset successfully' };
  }

  // Cambiar password (usuario autenticado)
  async changePassword(userId, currentPassword, newPassword) {
    const user = await userRepository.findByEmailWithPassword(
      (await userRepository.findById(userId)).email
    );

    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }
}

module.exports = new AuthService();
