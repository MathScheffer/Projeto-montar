const authenticationService = require('../service/AuthenticationService');

exports.autenticar = (req,res) => {
    const body = req.body;
    authenticationService.autenticar(body.username,body.senha,(err,usuario) => {
        if(err){
            res.status(err.status).json(err);
        }else{
            res.json(usuario);
        }
    })
    /* const sql = "SELECT nome,senha from USUARIOS WHERE nome = ?";

    const body = req.body;

    conexao.query(sql,[body.nome],(error,rows) => {
        if(error){
            res.status(500).json({
                "Erro":"Houve um erro interno no sistema!"
            })
        }else{
            if(Utils.retornaVariasLinhas(rows,"nome",body.nome).length == 0 ){
                if(rows.length == 1){
                    let check =  bcrypt.compare(body.senha,rows[0].senha);
                    check.then(response => {
                        if(response){
                            var token = jwt.sign({ Nome: body.nome,Senha: rows[0].senha }, 'shhhhh');
                            console.log(token);
                            var decoded = jwt.verify(token, 'shhhhh');
                            console.log(decoded)
                            res.status(200).json({"status":"OK", "token":token})
                        }else{
                            res.status(400).json({
                                "AuthenticationFailed":"Usuario ou senha incorreto!"
                            })
                        }
                    })
                }else{
                    res.status(400).json({
                        "AuthenticationFailed":"Usuario ou senha incorreto!"
                    })
                }
            }else{
                res.status(400).json({
                    "erro":"Há usuarios com o mesmo nome"
                })
            }
        }
    }) */
}