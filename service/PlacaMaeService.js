const placaMaeRepository = require('../repository/PlacaMaeRepository');
const Utils = require('../Utils/utils');
const placaMaeConstants = require('../constants/placaMaeConstants');

exports.criar = async(reqBody,callback) => {
    placaMaeRepository.criar(
        reqBody.nome,
        reqBody.socket,
        reqBody.frequencia_max_ram,
        reqBody.max_ram,
        reqBody.ddr,(err,placa) =>{
        
        if(err){
            const bodyMap = Utils.jsonToMap(reqBody);
            const camposFaltantes = Utils.retornaCamposFaltantes(reqBody,placaMaeConstants.ENTRADAS_VALIDAS);

            if(camposFaltantes){
                callback({
                    status:400,
                    message:`Ha campos faltantes na requisicao ${camposFaltantes}`
                },null)
            }else{
                const error = {
                    status:500,
                    message:"Houve um erro interno no servidor!",
                    error:error
                }
            }
        }else{
            callback(null,placa);
        }
    })
}

exports.listar = async(callback) => {
    placaMaeRepository.listar((err,placasMae) => {
        if(err){
            callback(null,{
                status: 500,
                message:"Houve um erro interno no servidor"
            });
        }else{
            callback(null,placasMae);
        }
    })
}