const usuarioRepository = require('../repository/usuarioRepository');
const utils = require('../Utils/utils');

exports.criarSequelize = async(reqBody,callback) => {
    usuarioRepository.criarSequelize(
        reqBody.username,reqBody.nome,reqBody.email,reqBody.senha,(err, rows)=>{
        if(err){
            if(err.name === "SequelizeValidationError"){
                callback({
                    status: 400,
                    message: err.errors[0].message,
                    type: err.errors[0].type
                },null)
            }
            callback(err,null);
        }else{
            callback(null,rows);
        }
    })

}

exports.listar = (callback) => {
    const username= 'teste'
    usuarioRepository.listar((err,rows)=> {
        if(err){
            callback({
                status:500,
                message:"Houve um erro interno no servidor"
            },null);
        }else{
            callback(null,{
                status:200,
                usuarios:rows
            })
        }
    })
}

exports.getUsuarioPorNome = (value,callback) =>{
    usuarioRepository.nomeUsuarioPorFiltro("nome",value,(err, rows)=>{
        if(rows.length > 0){
            callback(null,utils.geraMensagem(200,rows));
        }else if(rows.length == 0){
            callback(null,utils.geraMensagem(404,"Usuario nao encontrado!"))
        }else{
            callback(utils.geraMensagem(500,err), null);
        }
    })
}