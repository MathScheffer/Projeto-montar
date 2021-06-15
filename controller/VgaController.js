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
    vgaService.criar(reqBody,(err,vga) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            /*#swagger.responses[200] = {
                schema: {
                    $ref: "#models/schemas/Vga"
                }
            } */
            res.json(vga)
        }
    })
}

exports.listar = async(req,res) => {
    //#swagger.tags = ["Vga"]
    //#swagger.description = "Listar Vga"
    vgaService.listar((err,vgas) => {
        if(err){
            res.status(err.status).json(err);
        }else{
                /*#swagger.responses[200] = {
        schema: {
            $ref: "#definitions/ListarVga"
        }
    }*/
            res.json(vgas);
        }
    })
}