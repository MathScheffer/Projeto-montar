const ComputadorArmazenamentoRepository = require('../repository/ComputadorArmazenamentoRepository');

exports.criar = (reqBody, callback) => {
    let finalMessage = {};
    if(callback){
        ComputadorArmazenamentoRepository.criar(
            reqBody.ComputadorId,
            reqBody.ArmazenamentoId,(err,compArm) =>{
            
            finalMessage = parametrosValidacaoCriacao(reqBody);
                console.log(finalMessage)
            finalMessage.status == 201 ? callback(null,finalMessage) : callback(finalMessage,null);
        })
    }else{
        return finalMessage;
    }
}

function parametrosValidacaoCriacao(reqBody){
    const camposFaltantes = Utils.retornaCamposFaltantes(reqBody,computadorConstants.ENTRADAS_VALIDAS);
    if(camposFaltantes){
        return {
            status:400,
            message:`Ha campos faltando na requisicao: ${camposFaltantes}`
        }
    }else if(err){
        return {
            status:500,
            message: "Houve um erro interno no servidor!",
            error: err
        }
    }else{
        return {
            status:201,
            message:"Armazenamento adicionado ao computador com sucesso!"
        }
    }
}