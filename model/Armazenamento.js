const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize;

const Computador = require('./Computador');


class Armazenamento extends Model {
    static relationHasMany = async(Model) => {
        return Armazenamento.hasMany(Model);
    }
}

Armazenamento.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    tipo:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isIn:{
                args:[["HD","SSD"]],
                msg:"Tipo de armazenamento deve ser 'HD ou SSD'!"
            }
        }
    },
    nome:{
        type:DataTypes.STRING,
        allowNull:false
    },
    capacidade:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    consumo:{
        type:DataTypes.DECIMAL,
        defaultValue:12
    }
},{
    sequelize,
    modelName:"Armazenamento",
    tableName:"Armazenamento"
})

module.exports = Armazenamento