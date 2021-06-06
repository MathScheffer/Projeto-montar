const armazenamentoService = require('../service/ArmazenamentoService');

exports.criar = async(req,res) => {
    const reqBody = req.body;

    armazenamentoService.criar(reqBody,(err,armazenamento) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(armazenamento);
        }
    })
}

exports.listar = async(req,res) => {
    armazenamentoService.listar((err,armazenamentos) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(armazenamentos);
        }
    })
}