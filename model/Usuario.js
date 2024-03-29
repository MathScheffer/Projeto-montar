const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize; // copiar para a vga

class Usuario extends Model {

}

Usuario.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING(30),
        allowNull:false,
        unique:"unique_username"
    },
    nome:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique:"unique_nome"
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique:"unique_email" 
    },
    senha:{
        type:DataTypes.STRING(60),
        allowNull: false
    },
    permissions:{
        type:DataTypes.INTEGER(1),
        allowNull:false,
        validate:{     
            isIn:{
                args:[[0,1]],
                msg:"permissions  deve ser 0 ou 1!"
            }
        }
    }
},{
    sequelize,
    modelName: "Usuario",
    tableName:"usuario"
})

module.exports = Usuario;