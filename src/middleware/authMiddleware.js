const jwtUtil = require('../utils/jwt');
const userRepository = require('../repositories/userRepository');

// Verificar que el usuario esta autenticado
const authenticate = async (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No token provided');
      return res.status(401).json({
        success: false,
        error: 'No token provided',
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('🔑 Token:', token.substring(0, 20) + '...');

    // Verificar token
    const decoded = jwtUtil.verifyAccessToken(token);
    console.log('Token decoded:', decoded);

    // Buscar usuario
    const user = await userRepository.findById(decoded.userId);
    console.log('👤 User found:', user ? user.name : 'NULL');

    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }

    if (!user.isVerified) {
      console.log('User not verified');
      return res.status(403).json({
        success: false,
        error: 'Please verify your email',
      });
    }

    // Agregar usuario al request
    req.user = {
      userId: user.id,
      email: user.email,
      name: user.name,
    };

    console.log('User authenticated:', req.user.name);
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired',
      });
    }

    next(error);
  }
};

// Autenticación opcional - si hay token lo verifica, si no, continúa sin req.user
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No hay token, continuar sin autenticación
      return next();
    }

    const token = authHeader.split(' ')[1];

    // Verificar token
    const decoded = jwtUtil.verifyAccessToken(token);

    // Buscar usuario
    const user = await userRepository.findById(decoded.userId);

    if (user && user.isVerified) {
      // Agregar usuario al request si existe y está verificado
      req.user = {
        userId: user.id,
        email: user.email,
        name: user.name,
      };
    }

    next();
  } catch (error) {
    // Si hay error con el token, continuar sin autenticación
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuth,
};
