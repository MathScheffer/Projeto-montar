const vgaService = require('../service/VgaService');

exports.criar = async(req,res) => {
    const reqBody = req.body;
    vgaService.criar(reqBody,(err,vga) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(vga)
        }
    })
}

exports.listar = async(req,res) => {
    vgaService.listar((err,vgas) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(vgas);
        }
    })
}