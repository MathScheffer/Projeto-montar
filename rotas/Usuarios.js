const express = require('express');
const rotas = express.Router();
const usuariosController = require('../controller/UsuariosController');
const authenticationController = require('../controller/AuthenticationController');

rotas.post('/novo',usuariosController.criar);

rotas.get('/',usuariosController.listar);
rotas.get('/especifico', usuariosController.usuarioPorNome)

rotas.put('/atualizar/:id',usuariosController.atualizar);

rotas.use(authenticationController.somenteAdm)
rotas.delete('/:id',usuariosController.apagar);

module.exports = rotas;