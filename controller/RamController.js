const ramService = require('../service/RamService');

exports.criar = async(req,res) => {
    const body = req.body;

    ramService.criar(body, (err,ram) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(ram)
        }
    })
}

exports.listar = async(req,res) => {
    ramService.listar((err,rams) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(rams);
        }
    })
}