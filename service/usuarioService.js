const usuarioRepository = require('../repository/usuarioRepository');
const utils = require('../Utils/utils');
const sequelizeErrors = require('../Utils/sequelizeErrors');
const bcrypt = require('bcrypt');

exports.criarSequelize = async(reqBody,callback) => {
    const hashSenha = reqBody.senha ?  bcrypt.hashSync(reqBody.senha,10) : null;

    usuarioRepository.criarSequelize(
        reqBody.username,reqBody.nome,reqBody.email,hashSenha,(err, rows)=>{

        const camposFaltantes = retornaCamposFaltantes(reqBody);
        if(camposFaltantes){
            callback({
                status:400,
                message:`Ha campos faltando na requisicao: ${camposFaltantes}`
            })
        }else if(err){
            const sequelizeError = JSON.parse(JSON.stringify(err));

            if(sequelizeError && sequelizeError.name === "SequelizeUniqueConstraintError"){
                const errors = sequelizeErrors.uniqueConstraintErrorUsuario(sequelizeError.errors);
                const error = {
                    status:400,
                    message:"Ha campos que devem ser preenchidos!",
                    camposFaltantes:errors
                }
                callback(error,null);
            }else{
                const error = {
                    status:500,
                    message:"erro interno do servidor",
                    error:err
                }
                callback(error,null);
            }
        }else{
            callback(null,rows);
        }
    })
}

retornaCamposFaltantes = (reqBody) => {
    const body =  utils.jsonToMap(reqBody);
    const camposNecessarios = ["nome","email","senha","username"];
    const camposFaltantes = [];
    camposNecessarios.forEach(key => {
        if(!body.has(key)){
            camposFaltantes.push(key);
        }
    });

    if(camposFaltantes.length > 0){
        return camposFaltantes.toString();
    }else{
        return false;
    }
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