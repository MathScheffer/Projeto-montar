const armazenamentoService = require('../service/ArmazenamentoService');

exports.criar = async(req,res) => {
    // #swagger.tags = ["Armazenamento"]
    // #swagger.descripton = "Cadastrar meio de armazenamento"
    /*#swagger.parameters["x-auth-token"] = {
        in: "header",
        required: true,
        definitions: "header"
    } */
    const reqBody = req.body;
    /*  #swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
            $ref: "#definitions/CadastroArmazenamento"
        }
    }*/
    /*#swagger.responses[200] = {
        schema: {
            $ref: "#models/schemas/Armazenamento"
        }
    }
    */
    /*#swagger.responses[400] = {
        definitions: "Ao tentar cadastrar meio de Armazenamento com falta de campos, lança o erro, mostrando os campos faltantes na mensagem",
        schema: {
            $ref: "#definitions/CadastroArmazenamento400CamposFaltantes"
        }
    } */
    /*#swagger.responses[400] = {
        definitions: "Ao tentar cadastrar meio de Armazenamento com o campo 'tipo' inválido, lança o erro, mostrando os valores permitidos na mensagem",
        schema: {
            $ref: "#definitions/CadastroArmazenamento400TipoInvalido"
        }
    } */
    /*#swagger.responses[500] => {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    armazenamentoService.criar(reqBody,(err,armazenamento) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(armazenamento);
        }
    })
}

exports.listar = async(req,res) => {
    //#swagger.tags = ["Armazenamento"]
    //#swagger.description = "Listar Armazenamento"
    /*#swagger.parameters["x-auth-token"] = {
        in: "header",
        required: true,
        definitions: "header"
    } */    
    /*#swagger.responses[200] = {
        schema: {
            $ref: "#definitions/ListarVga"
        }
    } */
    /*#swagger.responses[500] => {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    armazenamentoService.listar((err,armazenamentos) => {
        if(err){
            res.status(err.status).json(err);
        }else{

            res.json(armazenamentos);
        }
    })
}