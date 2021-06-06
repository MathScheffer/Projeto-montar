const express = require('express');
const rotas = express.Router();

const fonteController = require('../controller/FonteController');

rotas.post('/novo',fonteController.criar);

rotas.get('/',fonteController.listar);

module.exports = rotas;

