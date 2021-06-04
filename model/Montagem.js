const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize;

const {Usuario, PlacaMae, Processador, Ram, Armazenamento, Fonte} = require('./index');
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
            model:Usuario,
            key:'id'
        }
    },
    ProcessadorId:{
        type: DataTypes.INTEGER,
        references:{
            model:Processador,
            key:'id'
        }
    },
    PlacaMaeId:{
        type:DataTypes.INTEGER,
        references:{
            model:PlacaMae,
            key:'id'
        }
    },
    RamId:{
        type:DataTypes.INTEGER,
        references:{
            model:Ram,
            key:'id'
        }
    },
    ArmazenamentoId:{
        type:DataTypes.INTEGER,
        references:{
            model:Armazenamento,
            key:'id'
        },
        FonteId: {
            type:DataTypes.INTEGER,
            references:{
                model:Fonte,
                key:'id'
            }
        }
    }
}, {

    sequelize,
    modelName: "Montagem",
    tableName:"montagem"
})

module.exports = Montagem;