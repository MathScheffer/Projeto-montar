const processadorRepository = require('../repository/ProcessadorRepository');
const processadorConstants = require('../constants/processadorConstantes');
const Utils = require('../Utils/utils');

exports.criar = async(reqBody,callback) => {

    processadorRepository.criar(
        reqBody.nome,
        reqBody.marca,
        reqBody.frequencia,
        reqBody.frequencia_max,
        reqBody.socket,
        reqBody.consumo,(err,processador) => {

        if(err){
            const camposFaltantes = Utils.retornaCamposFaltantes(reqBody,processadorConstants.ENTRADAS_VALIDAS);

            if(camposFaltantes){
                callback({
                    status:400,
                    message:`Ha campos faltantes na requisicao: ${camposFaltantes}`
                })
            }else{
                const error = {
                    status:500,
                    message:"erro interno no servidor!",
                    error:err
                }
                callback(error,null)
            }
        }else{
            callback(null,processador)
        }
    })
}

exports.listar = async(callback) => {
    processadorRepository.listar((err,processadores) => {
        if(err){
            const error = {
                status:500,
                message:"Erro interno no servidor!",
                error:err
            }
            callback(error,null);
        }else{
            callback(null,processadores);
        }
    })
}