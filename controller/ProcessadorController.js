const processadorService = require('../service/ProcessadorService');


exports.criar = async(req,res) => {
    //#swagger.tags = ['Processador']
    //#swagger.description = "Adicionar um processador"
    const reqBody = req.body;
    /*#swagger.parameters["x-auth-token"] = {
        in: "header",
        required: true,
        definitions: "header"
    } */
    /* #swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
            $ref: "#definitions/CadastroProcessador"
        }
    }*/
    /*#swagger.responses[200] = {
        schema: {
            $ref: "#models/schemas/Processador",
        },
        description: "retorno do processador adicionado!"

    } */
    /*#swagger.responses[400] = {
        definitions: "Ao tentar cadastrar processador com falta de campos, lança o erro, mostrando os campos faltantes na mensagem",
        schema: {
            $ref: "#definitions/CadastroProcessador400CamposFaltantes"
        }
    } */
    /*#swagger.responses[500] => {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    processadorService.criar(reqBody, (err,processador) => {
        if(err){
            res.status(err.status).json(err);
        }else{

            res.json(processador);
        }
    })
}

exports.listar = async(req,res) => {
    //#swagger.tags = ['Processador']
    //#swagger.description = "Listar todos os processadores"
    /*#swagger.parameters["x-auth-token"] = {
        in: "header",
        required: true,
        definitions: "header"
    } */
    /*#swagger.responses[200] = {
        schema: {
            $ref: "#definitions/ListarProcessador"
        },
        description: "Array de objetos, onde cada objeto é um processador"
    }*/
    /*#swagger.responses[500] = {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    processadorService.listar((err,processadores) => {
        
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(processadores);
        }
    })
}