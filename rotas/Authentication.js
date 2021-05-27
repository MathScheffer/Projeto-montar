const express = require('express');
const rotas = express.Router();
const authenticationController = require('../controller/AuthenticationController');

rotas.post('/',authenticationController.autenticar);

 module.exports = rotas;