const Conexao = require('../config/conexaodb');
const conexao = Conexao.conexao;
const sequelize = Conexao.sequelize;
const Usuario = require('../model/Usuario');

exports.criar = async(username,nome,email,senha,permissions,callback) => {
    await sequelize.sync();

    try{
        const teste = await Usuario.create({
            username:username,
            nome:nome,
            email:email,
            senha:senha,
            permissions:permissions
        });
        callback(null,teste);
    }catch(err){
        callback(err,null)
    }
}

exports.listar = async(callback) => {
    try{
        const listaUsuarios = await Usuario.findAll({attributes:["id","nome","username","email"]});
        callback(null,listaUsuarios);
    }catch(err){
        callback(err,null)
    }
}

exports.usuarioPorNome = async(nome,callback) => {
    try{
        const usuario = await Usuario.findOne({
            where:{
                nome:nome
            }
        })

        callback(null,usuario)
    }catch(err){
        callback(err,null)
    }
}


exports.nomeUsuarioPorFiltro = (param,value,callback) => {
    const sql = `SELECT nome FROM usuarios WHERE ${param} = ?`;

    conexao.query(sql,[value],(err, rows) => {
        if(err){
            callback(err,null);
        }else{
            callback(null,rows);
        }
    })
}

exports.atualizar = async(params,id,callback) => {
    try{
        const atualizador = await Usuario.update(params,{
            where:{
                id:id
            }
        })
        callback(null,atualizador)
    }catch(err){
        callback(err,null)
    }
}

exports.apagar = async(id,callback) => {
    try{
        const userApagado = await Usuario.destroy({
            where:{
                id: id
            }
        })
        callback(null,userApagado)
    }catch(err){
        callback(err,null)
    }
}
