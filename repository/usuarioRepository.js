const Conexao = require('../config/conexaodb');
const conexao = Conexao.conexao;
const sequelize = Conexao.sequelize;
const Usuario = require('../model/Usuario');

exports.criarSequelize = async(username,nome,email,senha,callback) => {
    await sequelize.sync();

    try{
        const teste = await Usuario.create({
            username:username,
            nome:nome,
            email:email,
            senha:senha
        });
        callback(null,teste);
    }catch(err){
        callback(err,null)
    }
}

exports.cadastrarUsuario = (callback) => {
    const sql = "INSERT INTO usuarios("
}
exports.listar = (callback) => {
    const sql = "SELECT * FROM USUARIOS";

    conexao.query(sql, (err, rows) => {
        if(err){
            callback(err, null);
        }else{
            callback(null,rows);
        }
    })
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