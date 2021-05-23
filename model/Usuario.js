const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize;

class Usuario extends Model {

}

Usuario.init({
    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement:true,
        primaryKey:true,
        unique:"unique_username"
    },
    username:{
        type:DataTypes.STRING(30),
        allowNull:false,
        unique:"unique_username"
    },
    nome:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false 
    },
    senha:{
        type:DataTypes.STRING(60),
        allowNull: false
    }
},{
    sequelize,
    modelName: "Usuario",
    tableName:"usuarios"
})

module.exports = Usuario;