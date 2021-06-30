const fonteRepository = require('../repository/FonteRepository');
const fonteConstants = require('../constants/fonteConstants');
const sequelizeErrors = require('../Utils/sequelizeErrors');
const Utils  = require('../Utils/utils');

exports.criar = async(reqBody,callback) => {
    fonteRepository.criar(reqBody.nome, reqBody.capacidade, (err,fonte) => {
        if(err){
            const sequelizeError = JSON.parse(JSON.stringify(err));
            const camposFaltantes = Utils.retornaCamposFaltantes(reqBody,fonteConstants.ENTRADAS_VALIDAS);
            if(camposFaltantes){
                const error = {
                    status:400,
                    message:`Ha campos faltando na requisicao: ${camposFaltantes}`
                }
                callback(error,null);
            }else if(sequelizeError && sequelizeError.name === "SequelizeUniqueConstraintError"){
                const errors = sequelizeErrors.uniqueConstraintErrorArmazenamento(sequelizeError.errors);
                const error = {
                    status:422,
                    message:"Dado já cadastrado em outra Fonte!",
                    dado:errors.toString()
                }
                callback(error,null);
             }else{
                const error = {
                    status:500,
                    message:"Houve um erro interno no servidor!"
                }
                callback(error,null);
            }
        }else{
            callback(null,fonte);
        }
    })
}

exports.listar = async(callback) => {
    fonteRepository.listar((err,fontes) => {
        if(err){
            const error = {
                status:500,
                message:"Houve um erro interno no servidor!"
            }
            callback(error,null);
        }else{
            callback(null,fontes);
        }
    })
}