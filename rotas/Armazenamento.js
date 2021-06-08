const express = require('express');
const rotas = express.Router();

const armazenamentoController = require('../controller/ArmazenamentoController');

rotas.post('/novo',armazenamentoController.criar);

rotas.get('/',armazenamentoController.listar);

module.exports = rotas;