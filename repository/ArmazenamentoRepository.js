const conexao = require('../config/conexaodb');
const sequelize = conexao.sequelize;

const Armazenamento = require('../model/Armazenamento');

exports.criar = async(tipo, nome, capacidade, callback) => {
    await sequelize.sync({alter:true});

    try{
        const arm = await Armazenamento.create({
            tipo:tipo,
            nome:nome,
            capacidade:capacidade
        });
        callback(null,arm);
    }catch(err){
        callback(err,null);
    }
}

exports.listar = async(callback) => {
    await sequelize.sync();

    try{
        const armazenamentos = await Armazenamento.findAll();
        callback(null,armazenamentos);
    }catch(err){
        callback(err,null);
    }
}