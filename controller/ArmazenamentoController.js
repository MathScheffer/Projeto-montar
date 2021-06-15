const armazenamentoService = require('../service/ArmazenamentoService');

exports.criar = async(req,res) => {
    // #swagger.tags = ["Armazenamento"]
    // #swagger.descripton = "Cadastrar meio de armazenamento"
    const reqBody = req.body;
    /*  #swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
            $ref: "#definitions/CadastroArmazenamento"
        }
    }
    */

    armazenamentoService.criar(reqBody,(err,armazenamento) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            /*#swagger.responses[200] = {
                schema: {
                    $ref: "#models/schemas/Armazenamento"
                }
            }
            */
            res.json(armazenamento);
        }
    })
}

exports.listar = async(req,res) => {
    //#swagger.tags = ["Armazenamento"]
    //#swagger.description = "Listar Armazenamento"
    armazenamentoService.listar((err,armazenamentos) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            /*#swagger.responses[200] = {
                schema: {
                    $ref: "#definitions/ListarVga"
                }
            } */
            res.json(armazenamentos);
        }
    })
}