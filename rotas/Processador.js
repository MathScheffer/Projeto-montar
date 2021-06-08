const express = require('express');
const rotas = express.Router();

const processadorController = require('../controller/ProcessadorController');
const authenticationController = require('../controller/AuthenticationController');

rotas.post('/novo',authenticationController.somenteAdm,processadorController.criar);

rotas.get('/',processadorController.listar);

module.exports = rotas;

