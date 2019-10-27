const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
// Usamos bodyParser para recibir el JSON correctamente del módulo WIFI
app.use(bodyParser.json({ type: 'application/json' }))

// Activamos CORS para que el FRONT END pueda recibir los datos.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Routes
 */
app.get('/', function (req, res) {
  const moment = require('moment');
  res.send('API V 1.0 ' + moment().format('YYYY-MM-DD HH:mm:ss'));
});

// Registramos las rutas
require('./Routes')(app);

app.listen(PORT, function () {
  console.log(`APP running on PORT: ${PORT}`);
});
