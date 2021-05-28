const express = require('express');
const rotas = express.Router();
const usuariosController = require('../controller/UsuariosController');

rotas.post('/novo',usuariosController.criar);

rotas.get('/',usuariosController.listar);
rotas.get('/especifico', usuariosController.usuarioPorNome)

rotas.put('/atualizar/:id',usuariosController.atualizar);

rotas.delete('/:id',usuariosController.apagar);

module.exports = rotas;