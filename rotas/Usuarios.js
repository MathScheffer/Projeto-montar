const express = require('express');
const rotas = express.Router();
const usuariosController = require('../controller/UsuariosController');
const authenticationController = require('../controller/AuthenticationController');

rotas.get('/teste',usuariosController.testarRelacionamento)
rotas.get('/teste2',usuariosController.teste2Relacionamento)

rotas.post('/novo',usuariosController.criar);

rotas.get('/',usuariosController.listar);
rotas.get('/especifico', usuariosController.usuarioPorNome)

rotas.use(authenticationController.somenteAdm);
rotas.put('/atualizar/:id',usuariosController.atualizar);


//rotas.use(authenticationController.somenteAdm)
rotas.delete('/:id',usuariosController.apagar);

module.exports = rotas;