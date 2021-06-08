const conexao = require('../config/conexaodb');
const sequelize = conexao.sequelize;

const Processador = require('../model/Processador');

exports.criar = async(nome,marca,frequencia,frequencia_max,socket,tdp,consumo_max,callback) => {
    await sequelize.sync({alter:true});
    
    try{
        const processador = await Processador.create({
            nome:nome,
            marca:marca,
            frequencia:frequencia,
            frequencia_max:frequencia_max,
            socket:socket,
            tdp:tdp,
            consumo_max:consumo_max
        })

        callback(null,processador)
    }catch(err){
        callback(err,null);
    }
}

exports.listar = async(callback) => {
    await sequelize.sync();

    try{
        const processadores = await Processador.findAll();
        callback(null,processadores);
    }catch(err){
        callback(err,null);
    }
}