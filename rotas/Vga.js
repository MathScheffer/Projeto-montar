const express = require('express');
const rotas = express.Router();

const vgaController = require('../controller/VgaController');

const authenticationController = require('../controller/AuthenticationController');

rotas.post('/novo',authenticationController.somenteAdm,vgaController.criar);

rotas.get('/',vgaController.listar);

module.exports = rotas;