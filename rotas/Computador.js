const express = require('express');
const rotas = express.Router();

const computadorController = require('../controller/ComputadorController');
const computadorArmazenamentoController = require('../controller/ComputadorArmazenamentoController')

rotas.post('/novo',computadorController.criar);

rotas.post('/adicionar/processador',computadorController.adicionarProcessador);
rotas.post('/adicionar/placa-mae',computadorController.adicionarPlacaMae);
rotas.post('/adicionar/ram',computadorController.adicionarRam);
rotas.post('/adicionar/armazenamento',computadorController.adicionarArmazenamento);
rotas.post('/adicionar/vga',computadorController.adicionarVga);
rotas.post('/adicionar/computador',computadorController.adicionarComputador);
rotas.post('/adicionar/fonte',computadorController.adicionarFonte);
rotas.post('/adicionar/armazenamento/teste', computadorArmazenamentoController.criar);
module.exports = rotas;