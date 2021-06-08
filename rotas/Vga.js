const express = require('express');
const rotas = express.Router();

const vgaController = require('../controller/VgaController');

rotas.post('/novo',vgaController.criar);

rotas.get('/',vgaController.listar);

module.exports = rotas;