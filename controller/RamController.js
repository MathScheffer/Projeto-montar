const ramService = require('../service/RamService');

exports.criar = async(req,res) => {
    //#swagger.tags = ["Ram"]
    //#swagger.description = "Adicionar Memoria Ram"
    const body = req.body;
    /*#swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
            $ref: "#definitions/CadastroRam"
        }
    }*/
    ramService.criar(body, (err,ram) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            /*#swagger.responses[200] = {
                schema: {
                    $ref: "#models/schemas/Ram"
                }  
            }*/
            res.json(ram)
        }
    })
}

exports.listar = async(req,res) => {
    // #swagger.tags = ["Ram"],
    // #swagger.description = "Listar Memórias"
    ramService.listar((err,rams) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            /*#swagger.responses[200] = {
                schema: {
                    $ref: "#definitions/ListarRam"
                }  
            }*/
            res.json(rams);
        }
    })
}