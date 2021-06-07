const computadorRepository = require('../repository/Computador');
const computadorConstants = require('../constants/computadorContants');
const Utils = require('../Utils/utils');
const sequelizeErrors = require('../Utils/sequelizeErrors');
const { Processador,/* , Computador */ 
PlacaMae} = require('../model');
const Computador = require('../model/Computador')

exports.criar = (reqBody,callback) => {
    computadorRepository.criar(reqBody.UsuarioId,
        reqBody.ProcessadorId,
        reqBody.PlacaMaeId,
        reqBody.RamId,
        reqBody.ArmazenamentoId,
        reqBody.VgaId,
        reqBody.FonteId, (err,computador) => {

        if(err){
            const camposFaltantes = Utils.retornaCamposFaltantes(reqBody,computadorConstants.ENTRADAS_VALIDAS);
            const sequelizeError = JSON.parse(JSON.stringify(err));
            if(camposFaltantes){
                const error = {
                    status:400,
                    message:`Ha campos faltando na requisicao: ${camposFaltantes}`
                }
                callback(error,null);
            }else if(sequelizeError && Utils.isErrno1452(err)){
                const error = {
                    status:422,
                    message:"Nao foi possivel adicionar hardware ao computador!",
                    error: sequelizeErrors.errno1452Computador(err)
                }
                callback(error,null)
            }else{
                console.log()
                error = {
                    status:500,
                    message:"Houve um erro interno no servidor!",
                    error:err
                }
                callback(error,null)
            }
        }else{
            callback(null,computador);
        }
    })
};

exports.adicionarProcessador = async(id,callback) => {
    try{
        let finalMessage = {};
        const processador = await Processador.findOne({
            where:{
                id:id
            }
        })

        if(processador){            
            Computador.integradorMontagem.set("Processador",processador);
            const proc =  Utils.sequelizeModelToJson(Computador.integradorMontagem.get("Processador"));
            const placasMae = await PlacaMae.findAll({
                where:{
                    socket:proc.socket
                }
            })

            finalMessage = {
                processador: processador,
                computador_agora:Utils.computadorAgora(),
                placas_mae_disponiveis:placasMae
            }
        }
        callback(null,finalMessage);
    }catch(err){
        const error = {
            status:500,
            message:"Erro interno no servidor!",
            err:err
        }
        callback(error,null);
    }
}

exports.adicionarPlacaMae = async(id,callback) => {
    try{
        let finalMessage = {};
        const placaMae = await PlacaMae.findOne({
            where:{
                id:id
            }
        });
        if(placaMae){            
            const processadorCadastrado = Computador.integradorMontagem.has("Processador");
            const plm = await Utils.sequelizeModelToJson(placaMae)
            const proc = processadorCadastrado ? await Utils.sequelizeModelToJson(Computador.integradorMontagem.get("Processador")) : false; 
            
            if(proc){
                if(proc.socket === plm.socket){
                    Computador.integradorMontagem.set("PlacaMae",placaMae);
                    finalMessage = {
                        status:201,
                        placa_mae: placaMae,
                        computador_agora:Utils.computadorAgora()
                    }
                }else{
                    finalMessage = {
                        status:422,
                        message:`Socket da Placa Mae(${plm.socket}) incompativel com o socket do Processador(${proc.socket})!`
                    }
                }
            }else{
                finalMessage = {
                    status:422,
                    message:`Necessario selecionar um processador!`
                }
            }
            
        }
        callback(null,finalMessage);
    }catch(err){
        const error = {
            status:500,
            message:"Erro interno no servidor!",
            err:err
        }
        callback(error,null);
    }  
}

exports.adicionarRam = async(id,callback) => {
    try{
        let finalMessage={};
        callback(null,finalMessage);
    }catch(err){
        callback(err,null);
    }
}