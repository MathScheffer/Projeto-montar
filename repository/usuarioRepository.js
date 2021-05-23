const Conexao = require('../config/conexaodb');
const conexao = Conexao.conexao;

exports.criarSequelize = (callback) => {
    
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