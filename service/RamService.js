const ramRepository = require('../repository/RamRepository');
const ramConstants = require('../constants/ramContants');
const sequelizeErrors = require('../Utils/sequelizeErrors');
const Utils = require('../Utils/utils');

exports.criar = async(reqBody, callback) => {
    ramRepository.criar(reqBody.nome,
        reqBody.frequencia,
        reqBody.capacidade,
        reqBody.ddr,
        reqBody.consumo,
        reqBody.quantidade,(err,ram)=>{

        if(err){
            const sequelizeError = JSON.parse(JSON.stringify(err));
            const camposFaltantes =  Utils.retornaCamposFaltantes(reqBody,ramConstants.ENTRADAS_VALIDAS);

            if(camposFaltantes){
                callback({
                    status:400,
                    message:`Ha campos faltando na requisicao: ${camposFaltantes}`
                })
            }else if(sequelizeError && sequelizeError.name === "SequelizeUniqueConstraintError"){
                const errors = sequelizeErrors.uniqueConstraintErrorRam(sequelizeError.errors);
                const error = {
                    status:422,
                    message:"Dado já cadastrado em outra Memoria Ram!",
                    dado:errors.toString()
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