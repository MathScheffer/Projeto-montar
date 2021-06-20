const express = require('express');
const app = express();
const port = 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    projeto: '0.0.1',
    info: {
      title: 'Documentação',
      description:'documentação da api',
      version: '0.0.1',
      contact:{
        name: 'Matheus M. Scheffer'
      },
      servers:["http://localhost:3000"]
    },
  },
  apis: ['./rotas/*.js'] // files containing annotations as above
 //apis:['routes/book.js']
};
const swaggerSpec = swaggerJsdoc(options)
/* app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec)); */

const swaggerFile = require('./swagger_output.json');
app.use('/api-docs-autogen',swaggerUi.serve,swaggerUi.setup(swaggerFile));

const authenticationController = require('./controller/AuthenticationController')

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const authentication = require('./rotas/Authentication');
//app.use('/api/authentication',authentication);
// Routes

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

const computador = require('./rotas/Computador');
app.use('/api/computador',computador);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
