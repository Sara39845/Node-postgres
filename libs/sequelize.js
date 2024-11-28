const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno

// Usa DATABASE_URL si está definida, de lo contrario construye la URI manualmente
const URI = process.env.DATABASE_URL || `postgres://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

console.log('Conexión URI:', URI); // Depuración

// Configuración de Sequelize
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log, // Puedes deshabilitarlo cambiándolo a `false`
});

module.exports = sequelize;
