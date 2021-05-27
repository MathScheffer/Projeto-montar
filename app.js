const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const usuarios = require('./rotas/Usuarios');
app.use('/api/usuarios', usuarios);

const authentication = require('./rotas/Authentication');
app.use('/api/authentication',authentication);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
