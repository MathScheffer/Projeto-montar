const authenticationService = require('../service/AuthenticationService');

exports.autenticar = (req,res) => {
    const body = req.body;
    authenticationService.autenticar(body.username,body.senha,(err,usuario) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            if(usuario.auth){
                res.json(usuario);
            }else{
                res.status(403).json(usuario);
            }
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
    authenticationService.validarPermissao(token, 2,(err,sucess) => {
        if(err){
            res.json(err);
        }else{
            next();
        }
    })
}