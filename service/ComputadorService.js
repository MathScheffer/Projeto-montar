const {Op} = require('sequelize');
const computadorRepository = require('../repository/Computador');
const computadorConstants = require('../constants/computadorContants');
const Utils = require('../Utils/utils');
const sequelizeErrors = require('../Utils/sequelizeErrors');
const { Processador,/* , Computador */ 
PlacaMae,
Ram,
Armazenamento,
Vga,
Fonte} = require('../model');
const Computador = require('../model/Computador')

exports.criar = (reqBody,callback) => {
    computadorRepository.criar(
        reqBody.UsuarioId,
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
            const placasMae = await PlacaMae.findAll({
                where:{
                    socket:processador.socket
                }
            })
            if(placasMae){
                Computador.integradorMontagem.set("Processador",processador);
                finalMessage = {
                    status:201,
                    processador: processador,
                    computador_agora:Utils.computadorAgora()
                }
            }else{
                finalMessage = {
                    status:422,
                    message:"Placa mae nao compativel com este processador!"
                }
            }
        }else{
            finalMessage = {
                status:422,
                message:`Processador indisponivel!`
            }
        }
        finalMessage.status == 201 ? callback(null,finalMessage) : callback(finalMessage,null);
    }catch(err){
        const error = {
            status:500,
            message:"Erro interno no servidor!",
            error:err
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
        }else{
            finalMessage = {
                status:422,
                message:`Placa Mae indisponivel!`
            }
        }
        finalMessage == 201 ? callback(null,finalMessage) : callback(finalMessage,null);
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

        const memRam = await Ram.findOne({
            where:{
                id:id
            }
        });
        if(memRam){
            const ram = await Utils.sequelizeModelToJson(memRam);
            const isPlacaMaeCadastrada =  Computador.integradorMontagem.has("PlacaMae");
            const plm = isPlacaMaeCadastrada ? await Computador.integradorMontagem.get("PlacaMae") : false;
            if(!plm){
                finalMessage = {
                    status:422,
                    message:`Necessario selecionar uma Placa Mae!!`
                }
            }else if(ram.capacidade > plm.max_ram){
                finalMessage = {
                    status:422,
                    message:`Capacidade da Memoria Ram(${ram.capacidade}) incompativel com a capacidade maxima de ram da Placa Mae(${plm.max_ram})!`
                }
            }else if(ram.frequencia > plm.frequencia_max_ram){
                finalMessage = {
                    status:422,
                    message:`Frequencia da Memoria Ram(${ram.frequencia}) incompativel com a frequencia suportada pela Placa Mae(${plm.frequencia_max_ram})!`
                }
            }else{
                Computador.integradorMontagem.set("Ram",memRam);
                finalMessage = {
                    status:201,
                    message:"Memoria Ram adicionada!",
                    ram: memRam,
                    computador_agora:Utils.computadorAgora()
                }
            }
        }else{
            finalMessage = {
                status:422,
                message:`Memoria Ram indisponivel.`
            }
        }

        finalMessage.status == 201 ? callback(null,finalMessage) :callback(finalMessage,null) ;
    }catch(err){
        const error = {
            status:500,
            message:"Erro interno no servidor!"
        }
        callback(error,null);
    }
}

exports.adicionarArmazenamento = async(id,callback) => {
    try{
        let finalMessage = {};
        const armazenamento = await Armazenamento.findOne({
            where:{
                id:id
            }
        })
        if(armazenamento){
            Computador.integradorMontagem.set("Armazenamento",armazenamento)
            finalMessage = {
                status:201,
                message:"Meio de armazenamento adicionado com sucesso!",
                armazenamento:armazenamento,
                computador_agora:Utils.computadorAgora()
            }
        }else{
            finalMessage = {
                status:422,
                message:"Meio de Armazenamento indisponivel!"
            }
        }
        finalMessage.status == 201 ? callback(null,finalMessage) : callback(finalMessage,null);
    }catch(err){
        const error = {
            status:500,
            message:"Erro interno no servidor!"
        }
        callback(error,null);
    }
}

exports.adicionarVga = async(id,callback) => {
    try{
        let finalMessage = {};
        const vga = await Vga.findOne({
            where:{
                id:id
            }
        })
        if(vga){
            Computador.integradorMontagem.set("Vga",vga);
            finalMessage = {
                status:201,
                message:"Vga adicionada com sucesso!",
                vga:vga,
                computador_agora:Utils.computadorAgora()
            }
        }else{
            finalMessage = {
                status:422,
                message:"Vga indisponivel!"
            }
        }
        finalMessage.status == 201 ? callback(null,finalMessage) : callback(finalMessage,null);
    }catch(err){
        const error = {
            status:500,
            message:"Erro interno no servidor!"
        }
        callback(error,null);
    }
}

exports.adicionarFonte = async(id,callback) => {
    try{
        let finalMessage = {};
        const fonte = await Fonte.findOne({
            where:{
                id:id
            }
        });

        if(fonte){
            const consumoTotal = Utils.retornaConsumo();
            const fnt = await Utils.sequelizeModelToJson(fonte);
            
            if(fnt.capacidade >= consumoTotal){
                Computador.integradorMontagem.set("Fonte",fonte);
                finalMessage ={
                    status:201,
                    message:"Fonte adicionada!",
                    fonte:fonte
                }
            }else{
                finalMessage = {
                    status:422,
                    message:`O consumo exigido (${consumoTotal}) excede a capacidade da fonte(${fnt.capacidade})!`
                }
            }
        }else{
            finalMessage = {
                status:422,
                message: `Fonte nao disponivel!`
            }
        }
        finalMessage.status == 201 ? callback(null,finalMessage) : callback(finalMessage,null);
    }catch(err){
        const error = {
            status:500,
            message:"Houve um erro interno no servidor!",
            error:err
        }
        callback(error,null);
    }
} 
exports.adicionarComputador = async(userId,callback) => {
    const processador = Utils.computadorAgoraMap().get('Processador');
    const placaMae = Utils.computadorAgoraMap().get('PlacaMae');
    const ram = Utils.computadorAgoraMap().get('Ram');
    const armazenamento = Utils.computadorAgoraMap().get('Armazenamento');
    const vga = Utils.computadorAgoraMap().get('Vga');
    const fonte = Utils.computadorAgoraMap().get('Fonte');
    const arrComponentes = [ processador.id,placaMae.id,ram.id,armazenamento.id,vga.id,fonte.id];

    computadorRepository.criar(userId,
        processador.id,
        placaMae.id,
        ram.id,
        armazenamento.id,
        vga.id,
        fonte.id,(err,computador) =>{
        
        if(err){
            if(arrComponentes.find(obj => obj === undefined)){
                const error = {
                    status:422,
                    message:"Ha componentes nao adicionados!"
                }
                callback(error,null);
            }else{
                const error = {
                    status:500,
                    message:"Erro interno no servidor!",
                    error:err
                };
                callback(error,null);
            }
        }else{
            callback(null,{
                status:201,
                computador:computador,
                computador_montado: Utils.computadorAgora()
            })  
        }
    })
}