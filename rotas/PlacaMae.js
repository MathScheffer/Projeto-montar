const express = require('express');
const rotas = express.Router();

const placaMaeController = require('../controller/PlacaMaeController');

rotas.post('/novo',placaMaeController.criar);

rotas.get('/',placaMaeController.listar);

module.exports = rotas;