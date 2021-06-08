const express = require('express');
const rotas = express.Router();

const fonteController = require('../controller/FonteController');

const authenticationController = require('../controller/AuthenticationController');

rotas.post('/novo',authenticationController.somenteAdm,fonteController.criar);

rotas.get('/',fonteController.listar);

module.exports = rotas;

