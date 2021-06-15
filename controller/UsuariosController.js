const Conexao = require('../config/conexaodb');
const conexao = Conexao.conexao;
const sequelize = Conexao.sequelize;
const usuarioService = require("../service/usuarioService");
const Usuario = require('../model/Usuario');
const Processador = require('../model/Processador');
const Computador = require('../model/Computador');
const Armazenamento = require('../model/Armazenamento');
const Fonte = require('../model/Fonte');
const bcrypt = require('bcrypt');
const Utils = require('../Utils/utils');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { PlacaMae, Ram } = require('../model');
const Vga = require('../model/VGA');

exports.criar = async(req,res) => {
    //#swagger.tags = ['Usuario']
    //#swagger.description = 'Endpoint para criar um usuario.'


    await sequelize.sync({ alter: true });
    /* #swagger.parameters[] = {
        in: "body", 
        name:"body",
        schema: {
          $ref: "#/definitions/CadastroUsuario", 
        },
        required: true, 
        description: "Body do Usuario", 
        } */
    usuarioService.criar(req.body,(err, rows) => {

        if(err){
            res.status(err.status).json(err);
        }else{
                /* #swagger.responses[200] = {
        schema: {
            $ref: "#/definitions/CadastroUsuarioResponse"
        },
        description:"Listagem de usuarios"
    } */
            res.json(rows);
        }
    })
}

exports.listar = (req, res) => {
    //#swagger.tags = ['Usuario']
    //#swagger.description = 'Endpoint para obter todos os usuarios.'

    usuarioService.listar((err, rows) => {
        if(err){
            res.status(err.status).json({
                Erro: err.message
            })
        }else{
    /* #swagger.responses[200] = {
        schema: {
            $ref: "#/definitions/Usuarios"
        },
        description:"Listagem de usuarios"
    } */
            res.json(rows)
        }
    });
}

exports.usuarioPorNome = async(req,res) => {
    //#swagger.tags = ['Usuario']
    //#swagger.description = 'Endpoint para obter um usuario por nome.'
    /* #swagger.parameters['nome'] = {
        in: "query", 
        schema: {
          $ref: "#/models/schemas/nome", 
        },
        required: true, 
        description: "A single todo id", 
        } */
    const nomeUsuario = req.query.nome;

    usuarioService.usuarioPorNome(nomeUsuario, (err, usuario) => {
        if(err){
            /* 
                #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/UsuarioPorNome" },
               description: 'Usuário encontrado.' 
        } */
            res.status(err.status).json(err);
        }else{
            res.status(usuario.status).json(usuario);
        }
    })
}

async function checkLogin (userSend,bdSend) {
    const auth = await bcrypt.compare(userSend,bdSend);
    return auth;
}


const fetchUsers = async(param,value) => {
    const sql = `SELECT nome FROM usuarios WHERE ${param} = ?`;
    const connection = await Conexao.conexaoAsync();
    const [rows, fields] = await connection.execute(sql,[value]);

    return rows;
}

exports.atualizar = async(req,res) => {
    //#swagger.tags=["Usuario"]
    //#swagger.description = 'Atualizar um usuario'
    const body = req.body;
        /* #swagger.parameters['id'] = {
        in: "query", 
        schema: {
          $ref: "#/models/schemas/id", 
        },
        required: true, 
        description: "Id do usuario desejado", 
        } */
    const id = req.params.id;
            /* #swagger.parameters = {
        in: "body", 
        name:"body",
        schema: {
          $ref: "#/models/schemas/Usuario", 
        },
        required: true, 
        description: "Body do Usuario", 
        } */
    usuarioService.atualizar(body,id,(err,usuarioAtualizado) => {
        if(err){
/*             #swagger.responses[200]= {
                    description: "Usuario atualizado!", 
                    schema: {
                        $ref: "#/models/schemas/Usuario", 
                    },
                }
            } */
            res.status(err.status).json(err);
        }else{
            res.json(usuarioAtualizado)
        }
    })
}

exports.apagar = async(req,res) => {
     //#swagger.tags = ['Usuario']
    //#swagger.description = 'Endpoint para deletar um usuario por nome.'
    /* #swagger.parameters['id'] = {
        in: "query", 
        schema: {
          $ref: "#/models/schemas/id", 
        },
        required: true, 
        description: "Id do usuario a ser deletado.", 
        } */
    const id = req.params.id;
    usuarioService.apagar(id, (err,usuarioApagado) => {
        if(err){
            res.status(err.status).json(err)
        }else{
            /*#swagger.responses[200] = {
                schema: {
                    $ref: "#/definitions/UsuarioDeletado"
                },
                description:"Usuario deletado!"
            }*/ 
            res.json(usuarioApagado)
        }
    })
}  

exports.teste2Relacionamento = async(req,res) => {
    await sequelize.sync({alter:true});
    //usuario e Computador = Um para Muitos
    Usuario.Computador = Usuario.hasMany(Computador);
    Computador.Usuario = Computador.belongsTo(Usuario);
    //Processador para Computador Um para Um
    Processador.Computador = Processador.hasOne(Computador);
    Computador.Processador = Computador.belongsTo(Processador);
    //Placa mae para Computador Um para Um
    PlacaMae.Computador = PlacaMae.hasOne(Computador);
    Computador.PlacaMae = Computador.belongsTo(PlacaMae);

    //Ram para Computador 
    Ram.Computador = Ram.hasOne(Computador);
    Computador.Ram = Computador.belongsTo(Ram);

    //Hd/ssd para Computador
    Armazenamento.Computador = Armazenamento.hasOne(Computador);
    Computador.Armazenamento = Computador.belongsTo(Armazenamento);

    //VGA
    Vga.Computador = Vga.hasOne(Computador);
    Computador.Vga = Computador.belongsTo(Vga);
    
    //Fonte para Computador

    //Fonte.Computador = Fonte.hasOne(Computador);
    //Computador.Fonte = Computador.belongsTo(Fonte);

    await sequelize.sync();

    const user =  await Usuario.create({
        username:'testador.2',
        nome:'Testador 2',
        email:'testador2@gmail.com',
        senha:'123',
        permissions:1
    }
    ,{
        include:[{
            association:Usuario.Computador
        }]
    });

    const processador = await Processador.create({
        nome: "INTEL CORE I7-10700KF OCTA-CORE 3.8GHZ (5.1GHZ TURBO)",
        marca:"intel",
        frequencia:3.8,
        frequencia_max:5,
        tdp:95,
        consumo_max: 130,
        socket:'LGA 1200'
    }
    ,{
       include:[{
           association: Processador.Computador
       }] 
    });

    const placaMae = await PlacaMae.create({
        nome:"Asus TUF Gaming Z490-Plus",
        socket:"LGA 1200",
        frequencia_max_ram:4800,
        max_ram:128,
        ddr:4
    },{
        include:[{
            association:PlacaMae.Computador
        }]
    });

    const ram = await Ram.create({
        nome:"TEAM GROUP T-FORCE PICHAU DELTA RGB 8GB",
        frequencia:3600,
        capacidade:8,
        ddr:4
    },{
        include:[{
            association:PlacaMae.Computador
        }]
    });

    const armazenamento = await Armazenamento.create({
        tipo:"HD",
        nome:"HD TOSHIBA P300 1TB 3.5",
        capacidade:1000
    },{
        include:[{
            association:Armazenamento.Computador
        }]
    })

    const vga = await Vga.create({
        nome:"Radeon 6800XT",
        capacidade:16,
        tdp:250,
        consumo_max:300
    },{
        include:[{
            association:Vga.Computador
        }]
    });
    
    const fonte = await Fonte.create({
        nome: "FONTE GAMER AZZA 750W 80 PLUS BRONZE",
        capacidade: 750
    } ,{
        include:[{ 
            association: await Fonte.relation(Computador)
        }]
    })

    const mont = await Computador.create({
        UsuarioId: user.id,
        ProcessadorId:processador.id,
        PlacaMaeId:placaMae.id,
        RamId:ram.id,
        ArmazenamentoId:armazenamento.id,
        VgaId:vga.id,
        FonteId : fonte.id
    },{
        include:[
            {
                association: await Computador.relation(Usuario)
            },{
                association: await Computador.relation(Processador)
            },{
                association: await Computador.relation(PlacaMae)
            },{
                association: await Computador.relation(Ram)
            },{
                association: await Computador.relation(Armazenamento)
            },{
                association: await Computador.relation(Vga)
            },{
                association: await Computador.relation(Fonte)
            }
        ] 
    });

    const computador_all = await Computador.findAll({
        attributes:['id'],
        include:[{
            model:Usuario,
                where:{
                    nome:"Testador 2"
                },
                attributes:["nome"]
            },{
                model:Processador
            },{
                model:PlacaMae
            },{
                model:Ram
            },{
                model:Armazenamento
            },{
                model:Vga
            },{
                model:Fonte
            }
        ]
    })

    res.send(computador_all)

}
