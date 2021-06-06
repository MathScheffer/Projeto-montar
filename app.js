const express = require('express');
const app = express();
const port = 3000;
const authenticationController = require('./controller/AuthenticationController')

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const authentication = require('./rotas/Authentication');
app.use('/api/authentication',authentication);

const usuarios = require('./rotas/Usuarios');
app.use('/api/usuarios',usuarios);

//produtos
const processador = require('./rotas/Processador');
app.use('/api/processador',processador);

const placaMae = require('./rotas/PlacaMae');
app.use('/api/placa-mae',placaMae);

const ram = require('./rotas/Ram');
app.use('/api/ram',ram);

const armazenamento = require('./rotas/Armazenamento');
app.use('/api/armazenamento',armazenamento);

const vga = require('./rotas/Vga');
app.use('/api/vga',vga);

const fonte = require('./rotas/Fonte');
app.use('/api/fonte',fonte);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
