const authenticationRepository = require('../repository/AuthenticationRepository');
const {JWT_SECRET, ENTRADAS_VALIDAS } = require('../constants/authenticationConstants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../Utils/utils');
const Usuario = require('../model/Usuario');
const Utils = require('../Utils/utils');

exports.autenticar = async(reqBody,callback) => {
    const username = reqBody.username;
    const senha = reqBody.senha;

    authenticationRepository.autenticar(username, (err,usuario) => {
        let finalMessage = {};
        if(err){
            const camposFaltantes = Utils.retornaCamposFaltantes(reqBody,ENTRADAS_VALIDAS)//retornaCamposFaltantes(reqBody);

            if(camposFaltantes){
                finalMessage = {
                    status:400,
                    message:`Ha campos faltando na requisicao: ${camposFaltantes}`
                }
            }else if(err.status == 404){
                finalMessage = {
                    status:400,
                    message:"Usuario ou senha incorreto!"
                }
            }else{
                finalMessage = {
                    status:500,
                    message:"erro interno do servidor!"
                }
            }
        }else{
            const user = JSON.parse(JSON.stringify(usuario));
            if(bcrypt.compareSync(senha,user.senha)){

                const token = jwt.sign({
                    username: user.username, senha: user.senha,permissions:user.permissions
                },JWT_SECRET,{expiresIn:'1h'});
                finalMessage = {
                    status:200,
                    usuario:user.username,
                    token: token
                }
            }else{
                finalMessage = {
                    status:400,
                    message:"Usuario ou senha incorreto!"
                }
            }
        }
        finalMessage.status == 200 ? callback(null,finalMessage) : callback(finalMessage,null);
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
         jwt.verify(token,JWT_SECRET,(err,payload) => {
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
    jwt.verify(token,JWT_SECRET,(err,payload) => {
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