const authenticationRepository = require('../repository/AuthenticationRepository');

exports.autenticar = async(nome,senha,callback) => {
    authenticationRepository.autenticar(nome,senha, (err,usuario) => {
        if(err){
            callback({
                status:500,
                message:"erro interno do servidor!"
            },null);
        }else{
            callback(null,usuario);
        }
    })
}