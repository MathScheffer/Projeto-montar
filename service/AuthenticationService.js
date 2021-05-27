const authenticationRepository = require('../repository/AuthenticationRepository');
const bcrypt = require('bcrypt');
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
                callback(null,{
                    auth:true,
                    usuario:usuario
                });
            }else{
                callback(null,{
                    auth:false,
                    usuario:usuario
                });
            }
        }
    })
}