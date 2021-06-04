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
    memoriaramService.criar(req.body,(err, rows) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(rows);
        }
    })
}

exports.listar = (req, res) => {
    memoriaramService.listar((err, rows) => {
        if(err){
            res.status(err.status).json({
                Erro: err.message
            })
        }else{
            res.json(rows)
        }
    });
}