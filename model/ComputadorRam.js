/* const { DataTypes, Model } = require('sequelize');
const config = require('../config/conexaodb');
//const { Computador, Ram } = require('./index');
const Computador = require('./Computador');
const Ram  = require('./Ram');
const sequelize = config.sequelize;

class ComputadorRam extends Model {
    static relation = async(Model) => {
        return ComputadorRam.belongsTo(Model);
    }
}

ComputadorRam.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    ComputadorId:{
        type: DataTypes.INTEGER,
        references:{
            model:"Computador",
            key:'id'
        }
    },
    RamId:{
        type: DataTypes.INTEGER,
        references:{
            model:Ram,
            key:'id'
        }
    }
},{
    sequelize,
    modelName: "ComputadorRam",
    tableName: "ComputadorRam"
})

module.exports = ComputadorRam; */