const express = require('express');
const rotas = express.Router();

const ramController = require('../controller/RamController');
const authenticationController = require('../controller/AuthenticationController');

rotas.post('/novo',authenticationController.somenteAdm,ramController.criar);
rotas.get('/',ramController.listar)

module.exports = rotas;