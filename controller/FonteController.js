const fonteService = require('../service/FonteService');

exports.criar = async(req,res) => {
    const reqBody = req.body;
    fonteService.criar(reqBody, (err, fonte) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(fonte);
        }
    })
}

exports.listar = async(req,res) => {
    fonteService.listar((err,fontes) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(fontes);
        }
    })
}