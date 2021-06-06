const processadorService = require('../service/ProcessadorService');

exports.criar = async(req,res) => {
    const reqBody = req.body;

    processadorService.criar(reqBody, (err,processador) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(processador);
        }
    })
}

exports.listar = async(req,res) => {
    processadorService.listar((err,processadores) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(processadores);
        }
    })
}