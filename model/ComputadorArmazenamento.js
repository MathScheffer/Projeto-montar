/* const { DataTypes, Model } = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize;


const Computador  = require('./Computador');
const Armazenamento = require('./Armazenamento');
//const { Computador, Armazenamento } = require('./index');
class ComputadorArmazenamento extends Model {
    static relation = async(Model) => {
        return ComputadorArmazenamento.belongsTo(Model);
    }
}

ComputadorArmazenamento.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    ComputadorId:{
        type: DataTypes.INTEGER,
        references:{
            model:"Computador",
            key:'id'
        }
    },
    ArmazenamentoId:{
        type: DataTypes.INTEGER,
        references:{
            model:Armazenamento,
            key:'id'
        }
    }
},{
    sequelize,
    modelName: "ComputadorArmazenamento",
    tableName: "ComputadorArmazenamento"
})

module.exports = ComputadorArmazenamento; */