const conexao = require('../config/conexaodb');
const sequelize = conexao.sequelize;

const Vga = require('../model/Vga');

exports.criar = async(nome, capacidade, tdp, consumo_max, img, callback) => {
    await sequelize.sync({alter:true});

    try{
        const vga = await Vga.create({
            nome:nome,
            capacidade:capacidade,
            tdp:tdp,
            consumo_max:consumo_max,
            img:img
        })
        callback(null,vga);
    }catch(err){
        callback(err,null);
    }
}

exports.listar = async(callback) => {
    await sequelize.sync();

    try{
        const vgas = await Vga.findAll();
        callback(null,vgas)
    }catch(err){
        callback(err,null);
    }
}