const conexao = require('../config/conexaodb');
const sequelize = conexao.sequelize;
const Usuario = require('../model/Usuario');
const Utils = require('../Utils/utils');

exports.autenticar = async(username, callback) => {
    await sequelize.sync({ alter: true });
    let usuarioVazio = true;
    try{
        const usuario = await Usuario.findOne({
            where:{
                username: username
            }
        })
        console.log(Utils.sequelizeModelToJson(usuario))
        if(usuario.id)
            usuarioVazio = false;
        callback(null,usuario);
    }catch(err){
        usuarioVazio ? callback({status:404},null) : callback(err,null);
    }
}
