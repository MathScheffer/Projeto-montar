const usuarioRepository = require('../repository/usuarioRepository');
const Utils = require('../Utils/utils');
const sequelizeErrors = require('../Utils/sequelizeErrors');
const bcrypt = require('bcrypt');
const Usuario = require('../model/Usuario');
const usuarioContants = require('../constants/usuarioConstants');

exports.criar = async(reqBody,callback) => {
    const hashSenha = reqBody.senha ?  bcrypt.hashSync(reqBody.senha,10) : null;

    usuarioRepository.criar(reqBody.username,
        reqBody.nome,
        reqBody.email,
        hashSenha,
        reqBody.permissions,(err, rows)=>{

        if(err){
            const sequelizeError = JSON.parse(JSON.stringify(err));
            const camposFaltantes = Utils.retornaCamposFaltantes(reqBody,usuarioContants.ENTRADAS_VALIDAS)//retornaCamposFaltantes(reqBody);

            if(camposFaltantes){
                callback({
                    status:400,
                    message:`Ha campos faltando na requisicao: ${camposFaltantes}`
                })
            }else if(sequelizeError && sequelizeError.name === "SequelizeUniqueConstraintError"){
                const errors = sequelizeErrors.uniqueConstraintErrorUsuario(sequelizeError.errors);
                const error = {
                    status:400,
                    message:"Dado(s) já cadastrado(s) em outro(s) usuario(s)!",
                    dados:errors
                }
                callback(error,null);
             }else if(sequelizeError && sequelizeError.name === "SequelizeValidationError"){
                const error = {
                    status:400,
                    message:sequelizeError.errors[0].message,
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

exports.usuarioPorNome = async(nome,callback) => {
    const nomeFormatado = nome.replace("%"," ");
    usuarioRepository.usuarioPorNome(nomeFormatado,(err,usuario)=>{
        if(err){
            callback({
                status:500,
                message:"Erro interno no servidor!"
            })
        }else if(usuario.length == 0){
            callback({
                status:404,
                message:"Nao ha usuario com este nome!"
            })
        }else{
            callback({
                status:200,
                usuario:usuario
            })
        }
    })
}

exports.atualizar = async(params,id,callback) => {
 
    const bodyObj = Utils.jsonToMap(params);
    const entradasInvalidas = Utils.validarEntradasInvalidas(bodyObj, usuarioContants.ENTRADAS_VALIDAS);

    if(bodyObj.has('senha') && bodyObj.get("senha")){
        params.senha = bcrypt.hashSync(params.senha,10);
    }

    if(entradasInvalidas.length > 0){
        const error = {
            status:400,
            message:"Houve entradas invalidas para o usuario!",
            entradasInvalidas: entradasInvalidas
        }
        callback(error,null)
    }else{
        usuarioRepository.atualizar(params,id,(err,userAtualizado) => {
            if(err){
                const error = {
                    status:500,
                    message:"Erro interno do servidor!"
                }
                callback(error,null)
            }else{
                fetchUsers(params).then(res => {
                    const mudancasDesejadas = JSON.stringify(params);
                    const mudancasfeitas = res
                    
                    if(mudancasDesejadas == mudancasfeitas){
                        const sucess = {
                            message:"Dados atualizados com sucesso!",
                            dados: JSON.parse(mudancasDesejadas)
                        }
                        callback(null,sucess)
                    }else{
                        const error = {
                            status:500,
                            message:"A atualizacao feita nao confere com a desejada!",
                            atualizacaoDesejada:JSON.parse(mudancasDesejadas),
                            atualizacaoFeita: JSON.parse(mudancasfeitas)
                        }
                        callback(error,null)
                    }
                })
            }
        })
        
    }
}

const fetchUsers = async(params) => {
    let paramsKeys = []
 
    Utils.jsonToMap(params).forEach((value,key) => {
        paramsKeys.push(key)
    });
    
    const usuario = await Usuario.findOne({
        attributes:paramsKeys,
        where:params
    })
    return JSON.stringify(usuario);
}

exports.apagar = async(id, callback) => {
    const query = {
        id: parseInt(id)
    }

    const usuario = await fetchUsers(query);

    if(usuario === "null"){
        const error = {
            status: 403,
            message:"Usuario ja deletado!"
        }
        callback(JSON.parse(JSON.stringify(error)), null)
    }else{
        usuarioRepository.apagar(id, (err,userApagado) => {
            if(err){
                const error = {
                    status:500,
                    message:"Erro interno do servidor!"
                }
                callback(error,null)
            }else{
                fetchUsers(query).then(res => { 
                    if(res === "null"){
                        callback(null,{
                            status:200,
                            message:"Usuario deletado com sucesso!",
                            response:userApagado
                        })
                    }else if(err){
                        const error = {
                            status:500,
                            message:"Houve um problema ao deletar usuario!",
                            error:err
                        }
                        callback(error,null)
                    }else{
                        const error = {
                            status:500,
                            message:"Usuario ja excluido."
                        }
                        callback(error,null)
                    }
                })
            }
        })
    }
}