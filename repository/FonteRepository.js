const conexao = require('../config/conexaodb');
const sequelize = conexao.sequelize;

const Fonte = require('../model/Fonte');

exports.criar = async(nome, capacidade, quantidade, callback)  => {
    await sequelize.sync({alter:true});

    try{
        const fonte = await Fonte.create({
            nome:nome,
            capacidade:capacidade,
            quantidade:quantidade
        })
        callback(null,fonte);
    }catch(err){    
        callback(err,null);
    }
}

exports.listar = async(callback) => {
    await sequelize.sync();

    try{
        const fontes = await Fonte.findAll();

        callback(null,fontes);
    }catch(err){
        callback(err,null);
    }
}

