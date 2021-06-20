const ramService = require('../service/RamService');

exports.criar = async(req,res) => {
    //#swagger.tags = ["Ram"]
    //#swagger.description = "Adicionar Memoria Ram"
    /*#swagger.parameters["x-auth-token"] = {
        in: "header",
        required: true,
        definitions: "header"
    } */
    /*#swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
            $ref: "#definitions/CadastroRam"
        }
    }*/
    const body = req.body;
    /*#swagger.responses[200] = {
        schema: {
            $ref: "#models/schemas/Ram"
        }  
    }*/
    /*#swagger.responses[400] = {
        definitions: "Ao tentar adicionar uma Memória Ram sem os parâmetros obrigatórios, retorna o erro informando os mesmos",
        schema: {
            $ref: "#definitions/CadastroRam400CamposFaltantes"
        }
    }*/
    /*#swagger.responses[400] = {
        definitions: "Ao tentar inserir um valor inválido para o campo 'ddr', será lançado o erro informado os valores válidos",
        schema: {
            $ref: "#definitions/CadastroRam400DdrInvalido"
        }
    } */
    /*#swagger.responses[500] = {
        schema: {
            $ref: "definitions/ErroInterno"
        }
    } */
    ramService.criar(body, (err,ram) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(ram)
        }
    })
}

exports.listar = async(req,res) => {
    // #swagger.tags = ["Ram"],
    // #swagger.description = "Listar Memórias"
    /*#swagger.parameters["x-auth-token"] = {
        in: "header",
        required: true,
        definitions: "header"
    } */
    /*#swagger.responses[200] = {
        schema: {
            $ref: "#definitions/ListarRam"
        }  
    }*/
    /*#swagger.responses[500] = {
        schema: {
            $ref: "#definitions/ErroInterno"
        }  
    }*/
    ramService.listar((err,rams) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(rams);
        }
    })
}