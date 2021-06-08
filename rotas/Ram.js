const express = require('express');
const rotas = express.Router();

const ramController = require('../controller/RamController');

rotas.post('/novo',ramController.criar);
rotas.get('/',ramController.listar)

module.exports = rotas;