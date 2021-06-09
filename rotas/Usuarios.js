const express = require('express');
const rotas = express.Router();
const usuariosController = require('../controller/UsuariosController');
const authenticationController = require('../controller/AuthenticationController');


rotas.get('/',authenticationController.somenteAdm,usuariosController.listar);
rotas.use(authenticationController.somenteAdm);
rotas.post('/novo',usuariosController.criar);

rotas.get('/especifico', usuariosController.usuarioPorNome)


rotas.put('/atualizar/:id',usuariosController.atualizar);

rotas.delete('/:id',usuariosController.apagar);

module.exports = rotas;