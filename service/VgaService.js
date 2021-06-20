const vgaRepository = require('../repository/VgaRepository');
const Utils = require('../Utils/utils');
const vgaConstantes = require('../constants/vgaConstants');

exports.criar = async(reqBody,callback) => {
    const tdp = reqBody.tdp;
    const consumo_max = tdp ? parseInt(tdp) * 1.5 : tdp;
    vgaRepository.criar(reqBody.nome,reqBody.capacidade,tdp,consumo_max,(err,vga) => {
        if(err){
            const camposFaltantes = Utils.retornaCamposFaltantes(reqBody,vgaConstantes.ENTRADAS_VALIDAS);
            if(camposFaltantes){
                const error = {
                    status:400,
                    message:`Ha campos faltando na requisicao: ${camposFaltantes}`
                }
                callback(error,null);
            }else{
                const error = {
                    status: 500,
                    message:"Houve um erro interno no sistema!",
                    error:err
                }
                callback(err,null);
            }
        }else{
            callback(null,vga);
        }
    })
}

exports.listar = async(callback) => {
    vgaRepository.listar((err,vgas) => {
        if(err){
            const error = {
                status:500,
                message:"Erro interno no servidor!"
            }
            callback(error,null);
        }else{
            callback(null,vgas);
        }
    })
}