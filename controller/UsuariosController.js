const Conexao = require('../config/conexaodb');
const conexao = Conexao.conexao;
const sequelize = Conexao.sequelize;
const usuarioService = require("../service/usuarioService");
const Usuario = require('../model/Usuario');
const Processador = require('../model/Processador');
const Montagem = require('../model/Montagem');
const Armazenamento = require('../model/Armazenamento');
const bcrypt = require('bcrypt');
const Utils = require('../Utils/utils');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { PlacaMae, Ram } = require('../model');

exports.criar = async(req,res) => {
    await sequelize.sync({ alter: true });
    usuarioService.criar(req.body,(err, rows) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(rows);
        }
    })
}

exports.listar = (req, res) => {
    usuarioService.listar((err, rows) => {
        if(err){
            res.status(err.status).json({
                Erro: err.message
            })
        }else{
            res.json(rows)
        }
    });
}

exports.usuarioPorNome = async(req,res) => {
    const nomeUsuario = req.query.nome;

    usuarioService.usuarioPorNome(nomeUsuario, (err, usuario) => {
        if(err){
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
    const body = req.body;
    const id = req.params.id;
    usuarioService.atualizar(body,id,(err,usuarioAtualizado) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(usuarioAtualizado)
        }
    })
}

exports.apagar = async(req,res) => {
    const id = req.params.id;
    usuarioService.apagar(id, (err,usuarioApagado) => {
        if(err){
            res.status(err.status).json(err)
        }else{
            res.json(usuarioApagado)
        }
    })
}  

exports.teste2Relacionamento = async(req,res) => {
    await sequelize.sync({force:true});
    //usuario e montagem = Um para Muitos
    Usuario.Montagem = Usuario.hasMany(Montagem);
    Montagem.Usuario = Montagem.belongsTo(Usuario);
    //Processador para Montagem Um para Um
    Processador.Montagem = Processador.hasOne(Montagem);
    Montagem.Processador = Montagem.belongsTo(Processador);
    //Placa mae para Montagem Um para Um
    PlacaMae.Montagem = PlacaMae.hasOne(Montagem);
    Montagem.PlacaMae = Montagem.belongsTo(PlacaMae);

    //Ram para Montagem 
    Ram.Montagem = Ram.hasOne(Montagem);
    Montagem.Ram = Montagem.belongsTo(Ram);

    //Hd/ssd para Montagem
    Armazenamento.Montagem = Armazenamento.hasOne(Montagem);
    Montagem.Armazenamento = Montagem.belongsTo(Armazenamento);

    //VGA

    
    //Fonte para Montagem


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
            association:Usuario.Montagem
        }]
    });

    const processador = await Processador.create({
        nome: "INTEL CORE I7-10700KF OCTA-CORE 3.8GHZ (5.1GHZ TURBO)",
        tipo:"intel",
        frequencia:3.8,
        frequencia_max:5,
        consumo:95,
        socket:'LGA 1200'
    }
    ,{
       include:[{
           association: Processador.Montagem
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
            association:PlacaMae.Montagem
        }]
    });

    const ram = await Ram.create({
        nome:"TEAM GROUP T-FORCE PICHAU DELTA RGB 8GB",
        frequencia:3600,
        capacidade:8,
        ddr:4
    },{
        include:[{
            association:PlacaMae.Montagem
        }]
    });

    const armazenamento = await Armazenamento.create({
        tipo:"HD",
        nome:"HD TOSHIBA P300 1TB 3.5",
        capacidade:1000
    },{
        include:[{
            association:Armazenamento.Montagem
        }]
    })

    const mont = await Montagem.create({
        UsuarioId: user.id,
        ProcessadorId:processador.id,
        PlacaMaeId:placaMae.id,
        RamId:ram.id,
        ArmazenamentoId:armazenamento.id
    },{
        include:[
            {
                association: Montagem.Usuario
            },{
                association: Montagem.Processador
            },{
                association: Montagem.PlacaMae
            },
            {
                association: Montagem.Ram
            },{
                association: Montagem.Armazenamento
            }
        ] 
    });

    const montagem_all = await Montagem.findAll({
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
        }]
    })

    res.send(montagem_all)

}
