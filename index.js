const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
require('dotenv').config();

// Importación de middlewares de manejo de errores
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();

// Usa el puerto que Vercel proporciona automáticamente o 3001 por defecto
const port = process.env.PORT || 3001;

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Configuración de CORS
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
};
app.use(cors(options));

// Rutas básicas de prueba
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// Configuración de rutas adicionales mediante routerApi
routerApi(app);

// Middlewares de manejo de errores
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Exporta el app para Vercel
module.exports = app;

console.log('Loaded Config:', require('./config/config').config);
