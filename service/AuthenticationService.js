const authenticationRepository = require('../repository/AuthenticationRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.autenticar = async(nome,senha,callback) => {
    authenticationRepository.autenticar(nome,senha, (err,usuario) => {
        if(err){
            callback({
                status:500,
                message:"erro interno do servidor!"
            },null);
        }else{
            const user = JSON.parse(JSON.stringify(usuario))[0];
            console.log(user)
            if(bcrypt.compareSync(senha,user.senha)){
                const token = jwt.sign({
                    username: user.username, senha: user.senha
                },'s3cr3t',{expiresIn:'1h'});

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

exports.validarToken = (token,callback) => {
    if(!token){
        const err = {
            status:400,
            message:"Nao ha token de acesso!"
        }
        callback(err, null)
    }else{
         jwt.verify(token,"s3cr3t",(err,payload) => {
            if(err){
                const error = {
                    status:403,
                    message:"Token invalido"
                }
                callback(error,null)
            }else{
               callback(null,{status:200,message:"Token validado com sucesso!"})
            }
        })
    }
}