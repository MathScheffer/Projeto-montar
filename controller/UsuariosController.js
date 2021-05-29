const Conexao = require('../config/conexaodb');
const conexao = Conexao.conexao;
const sequelize = Conexao.sequelize;
const usuarioService = require("../service/usuarioService");
const Usuario = require('../model/Usuario');
const bcrypt = require('bcrypt');
const Utils = require('../Utils/utils');
const jwt = require('jsonwebtoken');

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
