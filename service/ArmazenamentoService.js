const armazenamentoRepository = require('../repository/ArmazenamentoRepository');
const Utils = require('../Utils/utils');
const armazenamentoConstants = require('../constants/armazenamentoConstants');

exports.criar = async(reqBody, callback) => {
    armazenamentoRepository.criar(
        reqBody.tipo,
        reqBody.nome,
        reqBody.capacidade,(err,armazenamento) => {
        
        if(err){
            const camposFaltantes = Utils.retornaCamposFaltantes(reqBody,armazenamentoConstants.ENTRADAS_VALIDAS);
            const sequelizeError = JSON.parse(JSON.stringify(err));

            if(camposFaltantes){
                const error = {
                    status:400,
                    message:`Ha campos faltando na requisicao: ${camposFaltantes}`
                }
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