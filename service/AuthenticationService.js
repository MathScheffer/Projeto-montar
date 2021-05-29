const authenticationRepository = require('../repository/AuthenticationRepository');
const constants = require('../constants/authenticationConstants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../Utils/utils');
const Usuario = require('../model/Usuario')

exports.autenticar = async(username,senha,callback) => {
    authenticationRepository.autenticar(username, (err,usuario) => {
        if(err){
            callback({
                status:500,
                message:"erro interno do servidor!"
            },null);
        }else{
            const user = JSON.parse(JSON.stringify(usuario))[0];
            if(bcrypt.compareSync(senha,user.senha)){

                const token = jwt.sign({
                    username: user.username, senha: user.senha,permissions:user.permissions
                },constants.JWT_SECRET,{expiresIn:'1h'});

                callback(null,{
                    auth:true,
                    usuario:user.username,
                    token: token
                });
            }else{
                callback(null,{
                    auth:false,
                    message:"Usuario ou senha incorreto!"
                });
            }
        }
    })
}

const fetchUsers = async(params,paramsKeysSuperior = false) => {
    let paramsKeys = []
 
    utils.jsonToMap(params).forEach((value,key) => {
        paramsKeys.push(key)
    });

    const usuario = await Usuario.findOne({
        attributes:paramsKeysSuperior ? paramsKeysSuperior : paramsKeys,
        where:params
    })
    return JSON.stringify(usuario);
}

exports.validarToken = (token,callback) => {
    if(!token){
        const err = {
            status:400,
            message:"Nao ha token de acesso!"
        }
        callback(err, null)
    }else{
         jwt.verify(token,constants.JWT_SECRET,(err,payload) => {
            if(err){
                const error = {
                    status:403,
                    message:"Token invalido"
                }
                callback(error,null)
            }else{
               callback(null,{
                   status:200,
                   message:"Token validado com sucesso!",
                   payload:payload
                })
            }
        })
    }
}

exports.validarPermissao = (token,permissao,callback) => {
    permissao = permissao >= 1 ? 1 : 0;
    jwt.verify(token,constants.JWT_SECRET,(err,payload) => {
        if(err){
            const error = {
                status:403,
                message:"Token invalido"
            }
            callback(error,null)
        }else{
            const permissions = payload.permissions;
        
            if(permissions == permissao){
                callback(null,{
                    status:200,
                    message:"Permissao concedida!"
                 })
            }else{
                const error = {
                    status:401,
                    message:"Permissao nao concedida!"
                 }
                callback(error,null)  
            }
        }
    })

 /*    this.validarToken(token, (err,sucess) => {
        if(sucess){
            console.log(sucess.payload.permissions)
            console.log(permissao)
            if(sucess.payload.permissions === permissao){
                callback(null,{status:200,sucess,"permissaoNecessaria":permissao})
            }else{
                const error = {
                    status:403,
                    message:"Nao ha permissao para o perfil do usuario."
                }
                callback(error,null)
            }
        }else{
            callback({err},null)
        }
    }) */
}