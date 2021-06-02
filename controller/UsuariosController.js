const Conexao = require('../config/conexaodb');
const conexao = Conexao.conexao;
const sequelize = Conexao.sequelize;
const usuarioService = require("../service/usuarioService");
const Usuario = require('../model/Usuario');
const Processador = require('../model/Processador');
const Montagem = require('../model/Montagem');
const bcrypt = require('bcrypt');
const Utils = require('../Utils/utils');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

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
    Processador.Montagem = Processador.hasMany(Montagem);
    Montagem.Processador = Montagem.belongsTo(Processador);
    //Placa mae para Montagem Um para Um


    //Ram para Montagem 


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
            association:Usuario.Montagem,
            as:'user_proc'
        }]
    });

    const processador = await Processador.create({
        nome: "amd-fodonico",
        tipo:"amd",
        potencia:3.4,
        consumo:0,
        socket:'sem socket'
    }
    ,{
       include:[{
           association: Processador.Montagem,
           as:'proc_user'
       }] 
    });

    const mont = await Montagem.create({
        idUsuario: user.id,
        idProcessador:processador.id
    },
    {
        include:[
            {
                association: Montagem.Usuario,
                as:'proc_user'
            },{
                association: Montagem.Processador,
                as:'proc_user'
            }
        ] 
    });

   await user.addMontagem(mont)
    await processador.addMontagem(mont)

    const usuario_montagem = await Usuario.findOne({
        include:{
            model:Montagem,
            as:'Montagems'
        }
    })

    const processador_montagem = await Processador.findOne({
        include:{
            model:Montagem,
            as:'Montagems'
        }
    });

    res.send({
        usuario_montagem: usuario_montagem,
        processador_montagem:processador_montagem
    })

}

exports.testarRelacionamento = async(req,res) => {
    await sequelize.sync({force:true})
  Usuario.Processador = Usuario.belongsToMany(Processador,{through:Montagem});
  Processador.Usuario =  Processador.belongsToMany(Usuario,{through:Montagem});
  await sequelize.sync();
/*     Processador.hasOne(Montagem,{
        foreignKey:{

        }
    });
    Montagem.belongsTo(Processador) */
    //Verificar se a references terá de ficar com o noome do modelo no plural
   const user=  await Usuario.create({
        username:'testador.2',
        nome:'Testador 2',
        email:'testador2@gmail.com',
        senha:'123',
        permissions:1
    }
    ,{
        include:[{
            association:Usuario.Processador,
            as:'user_proc'
        }]
    })

    const proc = await Processador.create({
        nome: "amd-fodonico",
        tipo:"amd",
        potencia:3.4,
        consumo:0,
        socket:'sem socket'
    }
    ,{
       include:[{
           association: Processador.Usuario,
           as:'proc_user'
       }] 
    })

     const mont = await Montagem.create({
        idUsuario: user.id,
        idProcessador:proc.id
    })

   await user.addProcessador(proc )
    const users_proc = await Usuario.findOne({

        include: {
            model: Processador,
            as: 'Processadors'
          }
    })

    await proc.addUsuario(user)
    const proc_user = await Processador.findOne({

        include: {
            model: Usuario,
            as: 'Usuarios'
           /*  where: {
              id: { [Op.eq]: 1 }
            }, */
          }
       // include:Processador
    })
    
    const procs = await users_proc.getProcessadors();
    res.send({proc_user})
}