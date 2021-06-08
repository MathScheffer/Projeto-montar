const express = require('express');
const rotas = express.Router();

const processadorController = require('../controller/ProcessadorController');

rotas.post('/novo',processadorController.criar);

rotas.get('/',processadorController.listar);

module.exports = rotas;

