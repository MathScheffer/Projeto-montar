const vgaService = require('../service/VgaService');

exports.criar = async(req,res) => {
    //#swagger.tags = ['Vga']
    //#swagger.description = "Cadastrar Vga"
    const reqBody = req.body;
    /*#swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
          $ref: "#definitions/CadastroVga", 
        }
    }*/
    /* #swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
            $ref: "#definitions/CadastroProcessador"
        }
    }*/
    /*#swagger.responses[200] = {
        schema: {
            $ref: "#models/schemas/Vga"
        }
    } */
    /*#swagger.responses[400] = {
        definitions: "Ao tentar cadastrar Vga com falta de campos, lança o erro, mostrando os campos faltantes na mensagem",
        schema: {
            $ref: "#definitions/CadastroVga400CamposFaltantes"
        }
    } */
    /*#swagger.responses[500] => {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    vgaService.criar(reqBody,(err,vga) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(vga)
        }
    })
}

exports.listar = async(req,res) => {
    //#swagger.tags = ["Vga"]
    //#swagger.description = "Listar Vga"
    /*#swagger.responses[200] = {
        schema: {
            $ref: "#definitions/ListarVga"
        }
    }*/
    /*#swagger.responses[500] => {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    vgaService.listar((err,vgas) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(vgas);
        }
    })
}