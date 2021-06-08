const ramRepository = require('../repository/RamRepository');
const ramConstants = require('../constants/ramContants');

exports.criar = async(reqBody, callback) => {
    ramRepository.criar(reqBody.nome,
        reqBody.frequencia,
        reqBody.capacidade,
        reqBody.ddr,
        reqBody.consumo,(err,ram)=>{

        if(err){
            const sequelizeError = JSON.parse(JSON.stringify(err));
            const camposFaltantes =  Utils.retornaCamposFaltantes(reqBody,ramConstants.ENTRADAS_VALIDAS);

            if(camposFaltantes){
                callback({
                    status:400,
                    message:`Ha campos faltando na requisicao: ${camposFaltantes}`
                })
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
            callback(null,ram)
        }
    })
}

exports.listar = async(callback) => {
    ramRepository.listar((err,rams) => {
        if(err){
            const error = {
                status: 500,
                error: "Erro interno do servidor!"
            }
            callback(error, null);
        }else{
            callback(null,rams);
        }
    })
}