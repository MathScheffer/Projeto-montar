const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize;

class Processador extends Model {

}


Processador.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nome:{
        type: DataTypes.STRING(30),
        allowNull: false
      //  unique:"unique_nome"
    },
    tipo:{
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    potencia:{
        type:DataTypes.DECIMAL,
        allowNull: false
    },
    consumo:{
        type:DataTypes.DOUBLE,
        allowNull: false
    },
    socket:{
        type:DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize,
    modelName: "Processador",
    tableName:"processadores"
})

module.exports = Processador;