const computadorService = require('../service/ComputadorService');
const {UsuarioService, ProcessadorService, PlacaMaeService, ComputadorService, RamService, ArmazenamentoService,VgaService, FonteService} = require('../service/index');
exports.criar = (req,res) => {
    const reqBody = req.body;
    computadorService.criar(reqBody,(err, computador) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(computador);
        }
    })
};

exports.adicionarProcessador = (req,res) => {
    const id = req.body.id;
    ComputadorService.adicionarProcessador(id,(err,processador) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(processador);
        }
    })  
}

exports.adicionarPlacaMae = (req,res) => {
    const id = req.body.id;
    ComputadorService.adicionarPlacaMae(id,(err,PlacaMae) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(PlacaMae.status).json(PlacaMae);
        }
    })  
}