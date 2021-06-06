const placaMaeService = require('../service/PlacaMaeService');

exports.criar = async(req,res) => {
    const body = req.body;
    placaMaeService.criar(body,(err,placa) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(placa);
        }
    })
}

exports.listar = async(req,res) => {
    placaMaeService.listar((err,placas) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(placas)
        }
    })
}