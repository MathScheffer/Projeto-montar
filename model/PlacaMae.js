const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize;

class PlacaMae extends Model {

}

PlacaMae.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nome:{
        type:DataTypes.STRING,
        allowNull:false
    },
    socket:{
        type:DataTypes.STRING,
        allowNull:false
    },
    frequencia_max_ram:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    max_ram:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    ddr:{
        type:DataTypes.INTEGER(4),
        allowNull:false
    },
    consumo:{
        type:DataTypes.DECIMAL,
        allowNull:false,
        defaultValue:35
    }
},{
    sequelize,
    modelName:"PlacaMae",
    tableName:"PlacaMae",
    freezeTableName:true
})
module.exports = PlacaMae;