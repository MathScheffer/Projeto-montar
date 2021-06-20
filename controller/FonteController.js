const fonteService = require('../service/FonteService');

exports.criar = async(req,res) => {
    //#swagger.tags = ["Fonte"]
    //#swagger.description = "Cadastrar Fonte"
    const reqBody = req.body;
    /*#swagger.parameters["x-auth-token"] = {
        in: "header",
        required: true,
        definitions: "header"
    } */
    /*#swagger.parameters[] = {
        in: "body",
        name: "body",
        schema:{
            $ref: "#definitions/CadastroFonte"
        }
    }*/
    /*#swagger.responses[200] = {
        schema: {
            $ref: "#models/schemas/Fonte"
        }
    }*/
    /*#swagger.responses[500] => {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    fonteService.criar(reqBody, (err, fonte) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(fonte);
        }
    })
}

exports.listar = async(req,res) => {
    //#swagger.tags = ["Fonte"]
    //#swagger.description = "Listar Fontes"
    /*#swagger.parameters["x-auth-token"] = {
        in: "header",
        required: true,
        definitions: "header"
    } */
    /*#swagger.responses[200] = {
        schema: {
            $ref: "#definitions/ListarFontes"
        }
    }*/
    /*#swagger.responses[500] => {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    fonteService.listar((err,fontes) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(fontes);
        }
    })
}