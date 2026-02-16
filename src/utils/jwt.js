const jwt = require('jsonwebtoken');

class JwtUtil {
  // Generar access token
  generateAccessToken(user) {
    const payload = {
      userId: user.id || user._id, // Soporte para Sequelize (id) y Mongoose (_id)
      email: user.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '24h',
    });
  }

  // Generar refresh token
  generateRefreshToken(user) {
    const payload = {
      userId: user.id || user._id, // Soporte para Sequelize (id) y Mongoose (_id)
    };

    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
    });
  }

  // Verificar access token
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw error;
    }
  }

  // Verificar refresh token
  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      throw error;
    }
  }

  // Decodificar token sin verificar (util para debugging)
  decodeToken(token) {
    return jwt.decode(token);
  }
}

module.exports = new JwtUtil();
