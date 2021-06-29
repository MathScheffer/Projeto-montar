const Conexao = require('../config/conexaodb');
const conexao = Conexao.conexao;
const sequelize = Conexao.sequelize;

const Ram = require('../model/Ram');

exports.criar = async(nome,frequencia,capacidade,ddr,consumo,quantidade,callback) => {
    await sequelize.sync({alter:true});

    try{
        const ram = await Ram.create({
            nome:nome,
            frequencia:frequencia,
            capacidade:capacidade,
            ddr:ddr,
            consumo:consumo,
            quantidade:quantidade
        });
        callback(null,ram);
    }catch(err){
        callback(err,null);
    }
}

exports.listar = async(callback) => {
    await sequelize.sync();

    try{
        const ramMemos = await Ram.findAll({
            attributes:["nome","frequencia","capacidade","ddr","consumo"]
        })

        callback(null,ramMemos);
    }catch(err){
        callback(err,null);
    }
}