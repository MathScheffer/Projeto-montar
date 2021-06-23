const conexao = require('../config/conexaodb');
const sequelize = conexao.sequelize;

const PlacaMae = require('../model/PlacaMae');

exports.criar = async(nome, socket, frequencia_max_ram, max_ram, ddr, quantidade, callback) => {
    await sequelize.sync({alter:true})
    try{
        const placaMae = await PlacaMae.create({
            nome:nome,
            socket:socket,
            frequencia_max_ram:frequencia_max_ram,
            max_ram:max_ram,
            ddr:ddr,
            quantidade:quantidade
        })
        callback(null,placaMae)
    }catch(err){
        callback(err,null);
    }
}

exports.listar = async(callback) => {
    await sequelize.sync();

    try{
        const placasMae = await PlacaMae.findAll();
        callback(null,placasMae);
    }catch(err){
        callback(err,null);
    }
}