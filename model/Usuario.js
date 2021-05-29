const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize;

class Usuario extends Model {

}

Usuario.init({
    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING(30),
        allowNull:false,
        unique:"unique_data_users"
    },
    nome:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique:"unique_data_users"
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique:"unique_data_users" 
    },
    senha:{
        type:DataTypes.STRING(60),
        allowNull: false
    },
    permissions:{
        type:DataTypes.INTEGER(1),
        allowNull:false,
        isIn: [[0, 1]],
    }
},{
    sequelize,
    modelName: "Usuario",
    tableName:"usuarios"
})

module.exports = Usuario;