const computadorArmazenamentoService = require('../service/ComputadorArmazenamentoService');

exports.criar = (req,res) => {
    const reqBody = req.body;
    computadorArmazenamentoService.criar(reqBody,(err, computadorArmazenamento) => {
        if(err){
            res.status(err.status).json(err);
        }else{

            res.json(computadorArmazenamento);
        }
    })
}