const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize;

class Ram extends Model {
    static relationHasMany = async(Model) => {
        return Ram.hasMany(Model);
    }
}

Ram.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nome:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: "nome_ram"
    },
    frequencia:{
        type:DataTypes.INTEGER,
        allowNull:null
    },
    capacidade:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    ddr:{
        type:DataTypes.INTEGER(1),
        allowNull:false,
        validate:{
            isIn:{
                args:[[3,4]],
                msg:"Tipo de DDR da memoria 3 ou 4!"
            }
        }
    },
    img:{
        type:DataTypes.STRING,
        allowNull:false
    },
    consumo:{
        type:DataTypes.DECIMAL,
        defaultValue:3
    }
},{
    sequelize,
    modelName: "Ram",
    tableName:"Ram"
});

module.exports = Ram;