const computadorService = require('../service/ComputadorService');
const {UsuarioService, ProcessadorService, PlacaMaeService, ComputadorService, RamService, ArmazenamentoService,VgaService, FonteService} = require('../service/index');
exports.criar = (req,res) => {
    //#swagger.tags = ["Computador"]
    //#swagger.description = "Adicionar computador com os IDs dos hardwares"
    /*#swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
            $ref: "#definitions/AdicionarComputadorComIdsDosHardwares"
        }
    }*/
    const reqBody = req.body;

    /*#swagger.responses[201] = {
        schema: {
            $ref: "#definitions/AdicionarComputadorComIdsDosHardwares201"
        }
    }*/
    /*#swagger.responses[422] = {
        description: "Tentativa de adicionar um computador sem um Id de Hardware ou Usuario valido",
        schema: {
            $ref: "#definitions/AdicionarComputadorComIdsDosHardwares422ProblemaAoAdicionarHardware"
        }
    }*/
    /*#swagger.responses[400] = {
        description: "Tentativa de adicionar um computador com campo faltando",
        schema: {
            $ref: "#definitions/AdicionarComputadorComIdsDosHardwares400IdHardwareFaltando"
        }
    } */
    /*#swagger.responses[500] = {
        schema: {
            $ref: "#definitions/AdicionarComputadorComIdsDosHardwares400IdHardwareFaltando"
        }
    } */
    computadorService.criar(reqBody,(err, computador) => {
        if(err){
            res.status(err.status).json(err);
        }else{

            res.json(computador);
        }
    })
};

exports.adicionarProcessador = (req,res) => {
    //#swagger.tags = ["Computador"]
    //#swagger.description = "Adicionar Processador ao Computador"
    /*#swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
            $ref: "#definitions/IdHardware"
        }
    }*/
    const id = req.body.id;
    /*#swagger.responses[500] = {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarProcessadorResponse422PlacaMaeNaoCompativel"
        }
    }*/
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarProcessadorResponse422ProcessadorIndisponivel",
        }
    }*/
    /*#swagger.responses[201] ={
        schema: {
            $ref: "#definitions/AdicionarProcessadorResponse201"
        }
    }*/
    ComputadorService.adicionarProcessador(id,(err,processador) => {
        if(err){
            res.status(err.status).json(err);
            console.log(err)
        }else{
            res.status(processador.status).json(processador);
        }
    })  
}

exports.adicionarPlacaMae = (req,res) => {
    //#swagger.tags = ["Computador"]
    //#swagger.description = "Adicionar Placa Mae ao Computador"
    /*#swagger.parameters[] = {
        in:"body",
        name:"body",
        schema: {
            $ref: "#definitions/IdHardware"
        }
    }*/
    const id = req.body.id;
    /*#swagger.responses[201] = {
        schema: {
            $ref :"#definitions/AdicionarPlacaMaeResponse201"
        }
    } */
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarPlacaMaeResponse422PlacaMaeIndisponivel"
        }
    } */
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarPlacaMaeResponse422FaltaProcessador"
        }
    }*/
    /*#swagger.responses[422] = {
        schema:{
            $ref: "#definitions/AdicionarPlacaMaeResponse422SocketIncompativel"
        }
    } */
    /*#swagger.response[500] = {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */

    ComputadorService.adicionarPlacaMae(id,(err,PlacaMae) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(PlacaMae.status).json(PlacaMae);
        }
    })  
}

exports.adicionarRam = (req,res) => {
    //#swagger.tags = ["Computador"]
    //#swagger.description = "Adicionar Memoria Ram ao Computador"
    /*#swagger.parameters[] = {
        in: "body",
        parameters: "body",
        schema:{
            $ref: "#definitions/IdHardware"
        }
    }*/
    const id = req.body.id;
    /*#swagger.responses[201] = {
        schema:{
            $ref: "#definitions/AdicionarRamResponse201"
        }
    }*/
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarRamResponse422MemoriaIndisponivel"
        }
    } */
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarRamResponse422FrequenciaIncompativel"
        }
    }*/
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarRamResponse422CapacidadeIncompativel"
        }
    } */
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarRamResponse422FaltaPlacaMae"
        }
    } */
    /*#swagger.responses[500] = {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    ComputadorService.adicionarRam(id,(err,ram) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(ram.status).json(ram);
        }
    })
}

exports.adicionarArmazenamento = (req,res) => {
    //#swagger.tags = ["Computador"]
    //#swagger.description = "Adicionar Meio de armazenamento "
    /*#swagger.parameters[] = {
        in: "body",
        parameters: "body",
        schema:{
            $ref: "#definitions/IdHardware"
        }
    }*/
    const id = req.body.id;
    /*#swagger.responses[201] = {
        schema: {
            $ref: "#definitions/AdicionarArmazenamento201"
        }
    }*/
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarArmazenamento422ArmazenamentoIndisponivel"
        }
    }*/
    /*#swagger.responses[500] = {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    ComputadorService.adicionarArmazenamento(id,(err,armazenamento) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(armazenamento.status).json(armazenamento);
        }
    })
}

exports.adicionarVga = (req,res) => {
    //#swagger.tags = ["Computador"]
    //#swagger.definitions = "Adicionar Vga ao Computador"
    /*#swagger.parameters[] = {
        in: "body",
        body: "body",
        schema: {
            $ref: "#definitions/IdHardware"
        }
    } 
    */
    const id = req.body.id;
    /*#swagger.responses[201] = {
        schema: {
            $ref: "#definitions/AdicionarVga201"
        }  
    }*/
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarVga422VgaIndisponivel"
        }
    } */
    /*#swagger.responses[500] = {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    ComputadorService.adicionarVga(id,(err,vga) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(vga.status).json(vga);
        }
    })
}

exports.adicionarFonte = (req,res) => {
    //#swagger.tags = ["Computador"]
    //#swagger.description = "Adicionar Fonte ao Computador"
    /*#swagger.parameters[] = {
        in: "body",
        body: "body",
        schema: {
            $ref: "#definitions/IdHardware"
        }
    }*/
    const id = req.body.id;
    /*#swagger.responses[201] = {
        schema: {
            $ref: "#definitions/AdicionarFonte201"
        }
    }*/
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarFonte422FonteIndisponivel"
        }
    } */
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarFonte422CapacidadeExcedida"
        }
    } */
    /*#swagger.responses[500] = {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    ComputadorService.adicionarFonte(id,(err,fonte) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(fonte.status).json(fonte);
        }
    })
}

exports.adicionarComputador = (req,res) => {
    //#swagger.tags = ["Computador"]
    //#swagger.description = "Adicionar Computador ao Cliente"
    /*#swagger.parameters[] = {
        in: "body",
        nome: "body",
        schema: {
            $ref: "#definitions/IdHardware"
        }
    }*/
    console.log(req.body.id)
    const id = req.body.id;
    /*#swagger.responses[201] ={
        schema: {
            $ref: "#definitions/AdicionarComputador201"
        }
    }*/
    /*#swagger.responses[422] = {
        schema: {
            $ref: "#definitions/AdicionarComputador422ComponentesFaltando"
        }
    } */
    /*#swagger.responses[500] = {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    ComputadorService.adicionarComputador(id,(err,computador) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(computador.status).json(computador);
        }
    })
}