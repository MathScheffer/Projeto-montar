const placaMaeService = require('../service/PlacaMaeService');

exports.criar = async(req,res) => {
    //#swagger.tags = ['PlacaMae']
    //#swagger.description = "cadastrar uma placa mãe"
    const body = req.body;
    /* #swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
            $ref: "#definitions/CadastroPlacaMae"
        }
    }*/
    placaMaeService.criar(body,(err,placa) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            /* #swagger.responses[200] = {
                schema: {
                    $ref: "#models/schemas/PlacaMae"
                }
            }*/
            res.json(placa);
        }
    })
}

exports.listar = async(req,res) => {
     //#swagger.tags = ['PlacaMae']
    //#swagger.description = "Listar Placas Mãe"
    placaMaeService.listar((err,placas) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            /* #swagger.responses[200] = {
                schema: {
                    $ref: "#definitions/ListarPlacaMae"
                }
            }
            */
            res.json(placas)
        }
    })
}