const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected successfully');
    
    // Importar modelos para establecer relaciones
    require('../models/index');
    
    // Sincronizar modelos solo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database synchronized');
      
      // Ejecutar seed de datos iniciales
      const seedDatabase = require('./seedData');
      await seedDatabase();
    } else {
      // En producción, solo verificar las tablas
      console.log('Running in production mode - skipping auto sync');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };