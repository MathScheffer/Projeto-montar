const conexao = require('../config/conexaodb');
const { Computador, Armazenamento } = require('../model');
const sequelize = conexao.sequelize;

const ComputadorArmazenamento = require('../model/ComputadorArmazenamento');

exports.criar = async(ComputadorId,ArmazenamentoId,callback) => {
    await sequelize.sync();
    let error = null;
    let compArm  = {};
    try{
        compArm = await ComputadorArmazenamento.create({
            ComputadorId: ComputadorId,
            ArmazenamentoId:ArmazenamentoId
        }, {
            include:[
                {association: ComputadorArmazenamento.relation(Computador)},
                {association: ComputadorArmazenamento.relation(Armazenamento)}
            ]
        })
        //callback(null,compArm)
    }catch(err){
        //callback(err,null);
        error = 2;
    }

    if(callback){
        error ? callback(error,null) : callback(null, compArm);
    }else{
        if(error){
            return {"error":error}
        }
        return compArm;
    }
}