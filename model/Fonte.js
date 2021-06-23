const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize; 
const Computador = require('./Computador');

class Fonte extends Model {

    static relation = async(Model) => {
        return Fonte.hasOne(Model);
    }
}

Fonte.init({
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: "nome_fonte"
    },
    capacidade: {
        type:DataTypes.INTEGER,
        allowNull: false
    },
    quantidade:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},  { 
    sequelize,
    modelName: "Fonte",
    tableName:"fonte"
})



module.exports = Fonte;