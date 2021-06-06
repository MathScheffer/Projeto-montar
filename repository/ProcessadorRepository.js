const conexao = require('../config/conexaodb');
const sequelize = conexao.sequelize;

const Processador = require('../model/Processador');

exports.criar = async(nome,marca,frequencia,frequencia_max,socket,consumo,callback) => {
    await sequelize.sync({alter:true});
    
    try{
        const processador = await Processador.create({
            nome:nome,
            marca:marca,
            frequencia:frequencia,
            frequencia_max:frequencia_max,
            socket:socket,
            consumo:consumo
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