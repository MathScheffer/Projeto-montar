const conexao = require('../config/conexaodb');
const sequelize = conexao.sequelize;
const Usuario = require('../model/Usuario');

exports.autenticar = async(username, callback) => {
    await sequelize.sync({ alter: true });
    try{
        const usuario = await Usuario.findAll({
            where:{
                username: username
            }
        })
        callback(null,usuario);
    }catch(err){
        callback(err,null);
    }
}
