const placaMaeService = require('../service/PlacaMaeService');

exports.criar = async(req,res) => {
    //#swagger.tags = ['PlacaMae']
    //#swagger.description = "cadastrar uma placa mãe"
    /*#swagger.parameters["x-auth-token"] = {
        in: "header",
        required: true,
        definitions: "header"
    } */
    /* #swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
            $ref: "#definitions/CadastroPlacaMae"
        }
    }*/
    const body = req.body;

    /* #swagger.responses[200] = {
        schema: {
            $ref: "#models/schemas/PlacaMae"
        }
    }*/
    /*#swagger.responses[400] = {
        definitions: "Ao tentar cadastrar uma PLaca Mae com campos faltantes, retornará um erro informando os mesmos",
        schema:{
            $ref: "#definitions/CadastroPlacaMae400CamposFaltantes"
        }
    }*/
    placaMaeService.criar(body,(err,placa) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(placa);
        }
    })
}

exports.listar = async(req,res) => {
     //#swagger.tags = ['PlacaMae']
    //#swagger.description = "Listar Placas Mãe",
    /*#swagger.parameters["x-auth-token"] = {
        in: "header",
        required: true,
        definitions: "header"
    } */
    /* #swagger.responses[200] = {
        schema: {
            $ref: "#definitions/ListarPlacaMae"
        }
    }*/
    /*#swagger.responses[500] = {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    placaMaeService.listar((err,placas) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(placas)
        }
    })
}