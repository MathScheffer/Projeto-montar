const express = require('express');
const rotas = express.Router();
const usuariosController = require('../controller/UsuariosController');
const authenticationController = require('../controller/AuthenticationController');
const RamController = require('../controller/RamController');

/*rotas.get('/teste', RamController.testarRelacionamento)
rotas.get('/teste2', RamController.teste2Relacionamento)*/

rotas.post('/novo', RamController.criar);

rotas.get('/', RamController.listar);
rotas.get('/especifico',  RamController.memoriaRamPorId)

rotas.use(authenticationController.somenteAdm);
rotas.put('/atualizar/:id', RamController.atualizar);


//rotas.use(authenticationController.somenteAdm)
rotas.delete('/:id', RamController.apagar);

module.exports = rotas;