const express = require('express');
const rotas = express.Router();
const usuariosController = require('../controller/UsuariosController');

rotas.get('/seq/novo',usuariosController.criarSequelize);
rotas.get('/seq/get',usuariosController.getSequelize);
rotas.get('/seq/get/especifico',usuariosController.getSequelizeEspecifico);

rotas.get('/',usuariosController.listar);
rotas.get('/especifico', usuariosController.usuarioPorNome)

rotas.post('/auth',usuariosController.auth);
rotas.get('/testar-bcrypt',usuariosController.testarBcrypt);
rotas.post('/fake-login',usuariosController.fakeLogin);


rotas.post('/novo',usuariosController.criar);

rotas.put('/atualizar/:id',usuariosController.atualizar);

rotas.delete('/:id',usuariosController.apagar);

module.exports = rotas;