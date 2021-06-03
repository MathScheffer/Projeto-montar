const express = require('express');
const rotas = express.Router();
const authenticationController = require('../controller/AuthenticationController');

rotas.post('/',authenticationController.autenticar);
rotas.post('/validation/token',authenticationController.validarToken)
rotas.post('/validation/permissions',authenticationController.somenteAdm)
 module.exports = rotas;