const {DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize;

class Vga extends Model {

}

Vga.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nome:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: "nome_vga"
    },
    capacidade:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tdp:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    consumo_max:{
        type:DataTypes.DECIMAL,
        allowNull:false
    }
},{
    sequelize,
    modelName:"Vga",
    tableName:"Vga"
})

module.exports = Vga;