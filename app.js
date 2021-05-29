const express = require('express');
const app = express();
const port = 3000;
const authenticationController = require('./controller/AuthenticationController')

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const authentication = require('./rotas/Authentication');
app.use('/api/authentication',authentication);

const usuarios = require('./rotas/Usuarios');
app.use('/api/usuarios',authenticationController.validarToken,usuarios);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
