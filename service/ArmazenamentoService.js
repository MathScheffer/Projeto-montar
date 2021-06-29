const armazenamentoRepository = require('../repository/ArmazenamentoRepository');
const Utils = require('../Utils/utils');
const sequelizeErrors = require('../Utils/sequelizeErrors');
const armazenamentoConstants = require('../constants/armazenamentoConstants');

exports.criar = async(reqBody, callback) => {
    armazenamentoRepository.criar(
        reqBody.tipo,
        reqBody.nome,
        reqBody.capacidade,
        reqBody.quantidade,(err,armazenamento) => {
        
        if(err){
            const camposFaltantes = Utils.retornaCamposFaltantes(reqBody,armazenamentoConstants.ENTRADAS_VALIDAS);
            const sequelizeError = JSON.parse(JSON.stringify(err));

            if(camposFaltantes){
                const error = {
                    status:400,
                    message:`Ha campos faltando na requisicao: ${camposFaltantes}`
                }
                callback(error,null);
            }else if(sequelizeError && sequelizeError.name === "SequelizeUniqueConstraintError"){
                const errors = sequelizeErrors.uniqueConstraintErrorRam(sequelizeError.errors);
                const error = {
                    status:422,
                    message:"Dado já cadastrado em outro meio de Armazenamento!",
                    dado:errors.toString()
                }
                callback(error,null);
             }else if(sequelizeError && sequelizeError.name == "SequelizeValidationError"){
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
            callback(null,armazenamento);
        }
    })
}

exports.listar = async(callback) => {
    armazenamentoRepository.listar((err,armazenamentos) => {
        if(err){
            const error = {
                stauts:500,
                message:"Houve um erro interno no servidor!",
                error:err
            }
            callback(error,null);
        }else{
            callback(null,armazenamentos);
        }
    })
}