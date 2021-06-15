const fonteService = require('../service/FonteService');

exports.criar = async(req,res) => {
    //#swagger.tags = ["Fonte"]
    //#swagger.description = "Cadastrar Fonte"
    const reqBody = req.body;
    /*#swagger.parameters[] = {
        in: "body",
        name: "body",
        schema:{
            $ref: "#definitions/CadastroFonte"
        }
    }*/
    fonteService.criar(reqBody, (err, fonte) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            /*#swagger.responses[200] = {
                schema: {
                    $ref: "#models/schemas/Fonte"
                }
            }*/
            res.json(fonte);
        }
    })
}

exports.listar = async(req,res) => {
    //#swagger.tags = ["Fonte"]
    //#swagger.description = "Listar Fontes"
    fonteService.listar((err,fontes) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            /*#swagger.responses[200] = {
                schema: {
                    $ref: "#definitions/ListarFontes"
                }
            }*/
            res.json(fontes);
        }
    })
}