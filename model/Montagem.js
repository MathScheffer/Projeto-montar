const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize;

class Montagem extends Model {

}


Montagem.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    UsuarioId:{
        type: DataTypes.INTEGER,
        references:{
            model:'usuarios',
            key:'id'
        }
    },
    ProcessadorId:{
        type: DataTypes.INTEGER,
        references:{
            model:'processadores',
            key:'id'
        }
    }
},{
    sequelize,
    modelName: "Montagem",
    tableName:"montagem"
})

module.exports = Montagem;