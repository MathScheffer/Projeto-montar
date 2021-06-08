const express = require('express');
const rotas = express.Router();

const placaMaeController = require('../controller/PlacaMaeController');

const authenticationController = require('../controller/AuthenticationController');
rotas.post('/novo',authenticationController.somenteAdm,placaMaeController.criar);

rotas.get('/',placaMaeController.listar);

module.exports = rotas;