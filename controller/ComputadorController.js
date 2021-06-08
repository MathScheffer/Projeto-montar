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

exports.adicionarRam = (req,res) => {
    const id = req.body.id;
    ComputadorService.adicionarRam(id,(err,ram) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(ram.status).json(ram);
        }
    })
}

exports.adicionarArmazenamento = (req,res) => {
    const id = req.body.id;
    ComputadorService.adicionarArmazenamento(id,(err,armazenamento) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(armazenamento.status).json(armazenamento);
        }
    })
}

exports.adicionarVga = (req,res) => {
    const id = req.body.id;
    ComputadorService.adicionarVga(id,(err,vga) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(vga.status).json(vga);
        }
    })
}

exports.adicionarFonte = (req,res) => {
    const id = req.body.id;
    ComputadorService.adicionarFonte(id,(err,fonte) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(fonte.status).json(fonte);
        }
    })
}

exports.adicionarComputador = (req,res) => {
    const id = req.body.id;
    ComputadorService.adicionarComputador(id,(err,computador) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(computador.status).json(computador);
        }
    })
}