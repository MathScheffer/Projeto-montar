const conexao = require('../config/conexaodb');
const { Usuario, Processador, PlacaMae, Ram, Armazenamento, Vga, Fonte } = require('../model');
const sequelize = conexao.sequelize;

const Computador = require('../model/Computador');

exports.criar = async(UsuarioId,ProcessadorId,PlacaMaeId,RamId,ArmazenamentoId,VgaId,FonteId,callback) => {
    await sequelize.sync({alter:true});

    try{
        const computador = await Computador.create({
            UsuarioId:UsuarioId,
            ProcessadorId:ProcessadorId,
            PlacaMaeId:PlacaMaeId,
            RamId:RamId,
            ArmazenamentoId:ArmazenamentoId,
            VgaId:VgaId,
            FonteId:FonteId
        },{
            include:[
                {
                    association: await Computador.relation(Usuario)
                },{
                    association: await Computador.relation(Processador)
                },{
                    association: await Computador.relation(PlacaMae)
                },{
                    association: await Computador.relation(Ram)
                },{
                    association: await Computador.relation(Armazenamento)
                },{
                    association: await Computador.relation(Vga)
                },{
                    association: await Computador.relation(Fonte)
                }
            ]
        });

        callback(null,computador);
    }catch(err){
        callback(err,null)
    }
};

