const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config/conexaodb');
const sequelize = config.sequelize;

const {Usuario, PlacaMae, Processador, Ram, Armazenamento,Vga,Fonte} = require('./index');
class Computador extends Model {
    static relation = async(Model) => {
        return Computador.belongsTo(Model);
    }
    static integradorMontagem = new Map();

    static relationHasMany = async(Model) => {
        return Computador.hasMany(Model);
    }
}

Computador.init({
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
        }
    }, 
    FonteId: {
        type:DataTypes.INTEGER,
        references:{
            model:Fonte,
            key:'id'
        }
    },
    VgaId:{
        type:DataTypes.INTEGER,
        references:{
            model:Vga,
            key:'id'
        }
    }
}, {

    sequelize,
    modelName: "Computador",
    tableName:"computador"
})


module.exports = Computador;