const express = require('express');
const rotas = express.Router();
const authenticationController = require('../controller/AuthenticationController');

/**
 * @projeto
 * /:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
rotas.post('/',authenticationController.autenticar);
rotas.post('/validation/token',authenticationController.validarToken)
rotas.post('/validation/permissions',authenticationController.somenteAdm)
 module.exports = rotas;