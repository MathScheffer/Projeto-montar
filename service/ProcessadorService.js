const processadorRepository = require('../repository/ProcessadorRepository');
const processadorConstants = require('../constants/processadorConstantes');
const sequelizeErrors = require('../Utils/sequelizeErrors');
const Utils = require('../Utils/utils');
const { Processador } = require('../model');
//module.exports. = class ProcessadorService{
exports.criar = async(reqBody,callback) => {
    const consumo_max = reqBody.tdp ? reqBody.tdp * 1.5 : reqBody.tdp;
    processadorRepository.criar(
        reqBody.nome,
        reqBody.marca,
        reqBody.frequencia,
        reqBody.frequencia_max,
        reqBody.socket,
        reqBody.tdp,
        consumo_max,(err,processador) => {

        if(err){
            const sequelizeError = JSON.parse(JSON.stringify(err));
            const camposFaltantes = Utils.retornaCamposFaltantes(reqBody,processadorConstants.ENTRADAS_VALIDAS);

            if(camposFaltantes){
                callback({
                    status:400,
                    message:`Ha campos faltantes na requisicao: ${camposFaltantes}`
                })
            }else if(sequelizeError && sequelizeError.name === "SequelizeUniqueConstraintError"){
                const errors = sequelizeErrors.uniqueConstraintErrorRam(sequelizeError.errors);
                const error = {
                    status:422,
                    message:"Dado já cadastrado em outro processador!",
                    dado:errors.toString()
                }
                callback(error,null);
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
                message:"Erro interno no servidor!"
            }
            callback(error,null);
        }else{
            callback(null,processadores);
        }
    })
}

exports.atualizar = async(params,id, callback) => {
    const bodyObj = Utils.jsonToMap(params);
    const entradasInvalidas = Utils.validarEntradasInvalidas(bodyObj, processadorConstants.ENTRADAS_VALIDAS);
    if(entradasInvalidas.length > 0){
        const error = {
            status:400,
            message:"Houve entradas invalidas para o usuario!",
            entradasInvalidas: entradasInvalidas
        }
        callback(error,null)
    }else{
        processadorRepository.atualizar(params,id,(err,processadorAtualizado) => {
            if(err){
                const error = {
                    status:500,
                    message:"Erro interno do servidor!"
                }
                callback(error,null)
            }else{
                fetchProcessador(params).then(res => {
                    const mudancasDesejadas = JSON.stringify(params);
                    const mudancasfeitas = res
                    
                    if(mudancasDesejadas == mudancasfeitas){
                        const sucess = {
                            message:"Dados atualizados com sucesso!",
                            dados: JSON.parse(mudancasDesejadas)
                        }
                        callback(null,sucess)
                    }else{
                        const error = {
                            status:500,
                            message:"A atualizacao feita nao confere com a desejada!",
                            atualizacaoDesejada:JSON.parse(mudancasDesejadas),
                            atualizacaoFeita: JSON.parse(mudancasfeitas)
                        }
                        callback(error,null)
                    }
                })
            }
        })
        
    }
}
    
    
    /* atualizarQuantidade = async(qtd,id) => {
        let finalMessage = {};
        const qtdPendente = parseInt(qtd);
        if(isNaN(qtdPendente) && qtdPendente > -1){
            return {
                status:400,
                message:"Somente permitidos algarismos inteiros!"
            }
        }
        const params = {
            "quantidade":qtdPendente
        }
        const bodyObj = Utils.jsonToMap(params);
        const entradasInvalidas = Utils.validarEntradasInvalidas(bodyObj, processadorConstants.ATUALIZAR_QUANTIDADE);
        if(entradasInvalidas.length > 0){
            finalMessage = {
                status:400,
                message:"Houve entradas invalidas para o usuario!",
                entradasInvalidas: entradasInvalidas
            }
        }else{
            const response = await processadorRepository.atualizar(params,id);
            if(response.erro){
                return {
                    status:500,
                    message:"Erro interno do servidor!"
                }
            }
            const processadorAfetado = fetchProcessador({"id":id}).then(res => {
                const mudancasDesejadas = JSON.stringify(params);
                const mudancasfeitas = res
                
                if(mudancasDesejadas == mudancasfeitas){
                    finalMessage = {
                        status:200,
                        message:"Dados atualizados com sucesso!",
                        dados: JSON.parse(mudancasDesejadas)
                    }
                }else{
                    finalMessage = {
                        status:500,
                        message:"A atualizacao feita nao confere com a desejada!",
                        atualizacaoDesejada:JSON.parse(mudancasDesejadas),
                        atualizacaoFeita: JSON.parse(mudancasfeitas)
                    }
                }
            })
        }
    
    } */
exports.atualizarQuantidade = async(qtd,id) => {
    let finalMessage = {};
    const qtdPendente = parseInt(qtd);
    if(isNaN(qtdPendente) && qtdPendente > -1){
        return {
            status:400,
            message:"Somente permitidos algarismos inteiros!"
        }
    }
    if(isNaN(id) && id > 0){
        return {
            status:400,
            message:"Somente permitidos algarismos inteiros!"
        }
    }
    //salvar a quantidade retornada e realizar um novo fecth para comparar com a atualizada
    const params = {
        "quantidade":qtdPendente
    }
    const processadorInicial = await this.fetchProcessador({"id":id},["quantidade"])
    const procAtual = await processadorRepository.atualizar(params,id)
    const processadorFinal = await this.fetchProcessador({"id":id},["quantidade"])
    console.log(processadorInicial);
    console.log(processadorFinal)

}

const fetchProcessador = async(params,specificationOfReturn) => {
    if(specificationOfReturn){
        const processador = await Processador.findOne({
            attributes:specificationOfReturn,
            where:params
        })

        return JSON.parse(JSON.stringify(processador));
    }else{
        let paramsKeys = []
    
        Utils.jsonToMap(params).forEach((value,key) => {
            paramsKeys.push(key)
        });
        
        const processador = await Processador.findOne({
            attributes:paramsKeys,
            where:params
        })
        return JSON.parse(JSON.stringify(processador));
    }
}

exports.fetchProcessador
    
    
//}
