const express = require('express');
const rotas = express.Router();

const computadorController = require('../controller/ComputadorController');

rotas.post('/novo',computadorController.criar);

rotas.post('/adicionar/processador',computadorController.adicionarProcessador);
rotas.post('/adicionar/placa-mae',computadorController.adicionarPlacaMae);
module.exports = rotas;