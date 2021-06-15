const authenticationService = require('../service/AuthenticationService');

exports.autenticar = (req,res) => {
    //#swagger.tags = ["Autenticacao"] 
    //#swagger.description = "Realizar autenticacao"
    /*#swagger.parameters[] = {
        in: "body",
        name: "body",
        schema: {
            $ref: "#definitions/Autenticacao"
        }
    } */
    const body = req.body;
    /*#swagger.responses[200] */
    /*#swagger.responses[403] = {
        description: "Usuario ou Senha invalido",
        schema: {
            $ref: "#definitions/Autenticacao403"
        }
    } */
    /*#swagger.responses[400] = {
        description: "Tentativa de autenticar sem um campo",
        schema: {
            $ref: "#definitions/Autenticacao400CampoFaltando"
        }
    } */
    /*#swagger.responses[500] = {
        schema: {
            $ref: "#definitions/ErroInterno"
        }
    } */
    authenticationService.autenticar(body,(err,usuario) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.status(usuario.status).json(usuario);
        }
    })
}

exports.validarToken = (req,res,next) => {
    const token = req.get('x-auth-token');
    authenticationService.validarToken(token, (err,usuario) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            next();
        }
    })
}

exports.somenteAdm = (req,res,next) => {
    const token = req.get('x-auth-token');
    authenticationService.validarPermissao(token, 1,(err,sucess) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            console.log("vai dar next")
            next();
        }
    })
}