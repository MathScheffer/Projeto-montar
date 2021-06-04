const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize; 


class Fonte extends Model {


}

Fonte.init({
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type:DataTypes.STRING,
        allowNull: false
    },
    capacidade: {
        type:DataTypes.INTEGER,
        allowNull: false
    }
},  { 
    sequelize,
    modelName: "Fonte",
    tableName:"fonte"
})
    


module.exports = Fonte;