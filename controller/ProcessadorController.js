const processadorService = require('../service/ProcessadorService');

exports.criar = async(req,res) => {
    //#swagger.tags = ['Processador']
    //#swagger.description = "Adicionar um processador"
    const reqBody = req.body;
    /* #swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
            $ref: "#definitions/CadastroProcessador"
        }
    }
     */

    processadorService.criar(reqBody, (err,processador) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            /*#swagger.responses[200] = {
                schema: {
                    $ref: "#models/schemas/Processador",
                },
                description: "retorno do processador adicionado!"

            } */
            res.json(processador);
        }
    })
}

exports.listar = async(req,res) => {
    //#swagger.tags = ['Processador']
    //#swagger.description = "Listar todos os processadores"
    processadorService.listar((err,processadores) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            /*#swagger.responses[200] = {
                schema: {
                    $ref: "#definitions/ListarProcessador"
                },
                description: "Array de objetos, onde cada objeto é um processador"
            }
            */
            res.json(processadores);
        }
    })
}