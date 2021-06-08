const express = require('express');
const rotas = express.Router();

const armazenamentoController = require('../controller/ArmazenamentoController');

const authenticationController = require('../controller/AuthenticationController');

rotas.post('/novo',authenticationController.somenteAdm,armazenamentoController.criar);

rotas.get('/',armazenamentoController.listar);

module.exports = rotas;