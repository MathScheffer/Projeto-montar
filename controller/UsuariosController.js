const Conexao = require('../config/conexaodb');
const conexao = Conexao.conexao;
const sequelize = Conexao.sequelize;
//const usuarioRepository = require('../repository/usuarioRepository');
const usuarioService = require("../service/usuarioService");
const Usuario = require('../model/Usuario');
const bcrypt = require('bcrypt');
const Utils = require('../Utils/utils');
const jwt = require('jsonwebtoken');

exports.criarSequelize = async(req,res) => {
    await sequelize.sync({ alter: true });
    const teste = await Usuario.create({
        username:"test2.test2",
        nome:"testador2 t",
        email:"test2@gmail.com",
        senha:"123"
    });
    res.send(teste)
}

exports.getSequelize = async(req,res) => {
    await sequelize.sync({ alter: true });
    const teste = await Usuario.findAll({attributes:["nome","username","email"]});
    res.send(teste)
}

exports.getSequelizeEspecifico = async(req,res) => {
    try{
        const teste = await Usuario.findAll({
            attributes:["id","noe","username","email"],
            where:{
                id:3
            }
        }
        );
    res.send(teste)
    }catch(err) {
        console.log('erro: ',err)
        res.send(teste)
    }
    
}

exports.auth = (req,res) => {

}


exports.listar = (req, res) => {
    usuarioService.listar((err, rows) => {
        if(err){
            res.status(err.status).json({
                Erro: err.message
            })
        }else{
            res.json(rows)
        }
    });
}

exports.usuarioPorNome = async(req,res) => {
    const nomeUsuario = req.query.nome;

    usuarioService.getUsuarioPorNome(nomeUsuario, (err, rows) => {
        if(err){
            console.log(err)
            res.status(err.status).json(err);
        }else{
            console.log(rows.status)
            res.status(rows.status).json(rows);
        }
    })
   /*  console.log(req.query)
    try{
        fetchUsers("nome",nomeUsuario).then(rows => {
            res.status(200).json(rows);
        });
    }catch(e){
        res.status(400).json({"erro":e.message});
        console.error(e.message)
    } */

}

exports.fakeLogin2 = async(req,res) => {
    const sql = "SELECT nome,senha from USUARIOS WHERE nome = ?";

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
                            res.status(200).json({"stauts":"OK"})
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
    })
}

exports.fakeLogin = async(req,res) => {
    const sql = "SELECT nome,senha from USUARIOS WHERE nome = ?";

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
    })
}

async function checkLogin (userSend,bdSend) {
    const auth = await bcrypt.compare(userSend,bdSend);
    return auth;
}

exports.criar = async(req, res) => {

    try{
        await sequelize.authenticate();
        console.log("Conectou! :D")
    }catch(err){
        console.log(JSON.parse({"Erro":err}))
    }
    const sql = "INSERT INTO usuarios(nome, senha) VALUES (?,?)";

    let body = req.body;
    body.senha = bcrypt.hashSync(body.senha,10);

    let rowsFetched = await fetchUsers("nome",body.nome);
    
    if(rowsFetched.length == 0){
        conexao.query(sql,[body.nome,body.senha],(error, rows)=>{
            if(error){
                res.status(500).json({
                    "erro":"Houve um erro interno no sistema",
                    "error":error
                })
            }else{
                body.id = rows.insertId;
                res.status(201).json(body);
            }
        })
    }else{
        res.status(412).json({
            "Error":"Já existe outro usuário com este nome!",
            "rows":rowsFetched
        })
    }
}

const fetchUsers = async(param,value) => {
    const sql = `SELECT nome FROM usuarios WHERE ${param} = ?`;
    const connection = await Conexao.conexaoAsync();
    const [rows, fields] = await connection.execute(sql,[value]);

    return rows;
}

exports.atualizar = async(req,res) => {
    const body = req.body;
    const bodyObj = Utils.jsonToMap(body);
    const id = req.params.id;
    const params = ["nome","senha"];
    let query = [],values = [];

    params.forEach((param, index) => {
        if(bodyObj.has(param) && bodyObj.get(param)){ 
            query.push(`${param}=?`);

            let value = bodyObj.get(param)
            if(param === "senha"){
                value = bcrypt.hashSync(param,10);
                console.log(bodyObj.get(param))
                console.log(value);
                console.log(bcrypt.compareSync(bodyObj.get(param),value))
            }
            values.push(value);
        }
    })
    values.push(id);

    const sql = `UPDATE usuarios SET ${query.toString()} WHERE id = ?`;
    
    let naoContemNomeNaBase = await validaNomeNaBase(query,"nome",bodyObj);
    if(naoContemNomeNaBase.length == 0 || naoContemNomeNaBase == false){
        conexao.query(sql, values, (error, rows) => {
            if(error){
                res.status(500).json({
                    "Atencao":"Houve um erro interno no sistema!",
                    "Error":error
                })
            }else{
                let contemNomeNaBase = validaNomeNaBase(query,"nome",bodyObj);
                if(contemNomeNaBase){
                    res.status(200).json({
                        "Message":"Dados Atualizados com sucesso!",
                        "rows":rows});
                }else{
                    res.status(400).json({
                        "Message":"Os dados nao foram atualizados!",
                        "rows":rows
                    })
                }
            }
        })
    }else{
        res.status(412).json({"Erro":"Ja existe um usuario com este nome!"})
    }
}




exports.atualizar2 = async(req,res) => {
    const body = req.body;
    const bodyObj = Utils.jsonToMap(body);
    const id = req.params.id;
    const params = ["nome","senha"];
    let query = [],values = [];

    params.forEach((param, index) => {
        if(bodyObj.has(param) && bodyObj.get(param)){ 
            query.push(`${param}=?`);

            let value = bodyObj.get(param)
            if(param === "senha"){
                value = bcrypt.hashSync(param,10);
            }
            values.push(value);
        }
    })
    values.push(id);

    const sql = `UPDATE usuarios SET ${query.toString()} WHERE id = ?`;
    
    let naoContemNomeNaBase = await validaNomeNaBase(query,"nome",bodyObj);
    if(naoContemNomeNaBase.length == 0 || naoContemNomeNaBase == false){
        conexao.query(sql, values, (error, rows) => {
            if(error){
                res.status(500).json({
                    "Atencao":"Houve um erro interno no sistema!",
                    "Error":error
                })
            }else{
                let contemNomeNaBase = validaNomeNaBase(query,"nome",bodyObj);
                if(contemNomeNaBase){
                    res.status(200).json({
                        "Message":"Dados Atualizados com sucesso!",
                        "rows":rows});
                }else{
                    res.status(400).json({
                        "Message":"Os dados nao foram atualizados!",
                        "rows":rows
                    })
                }
            }
        })
    }else{
        res.status(412).json({"Erro":"Ja existe um usuario com este nome!"})
    }
}


async function validaNomeNaBase(arrayQuery,paramName,bodyObj){
    if(arrayQuery.find(param => param.startsWith(paramName) )){
        return await fetchUsers(paramName,bodyObj.get(paramName))
    }else{
       return  false
    }
}

exports.apagar = async(req,res) => {
    const id = req.params.id;
    const select = await fetchUsers("id",id);
    console.log(select.length)
    if(select.length == 1){
        const sql = "DELETE FROM usuarios WHERE id = ?";
        conexao.query(sql,[id],(error, rows) => {
            if(error){
                res.status(500).json({
                    "Erro":error
                })
            }else{
                //const selectNow = await fetchUsers("id",id);
                fetchUsers("id",id).then(selectNow => {
                    const resposta = selectNow.length == 0 ? "Usuario deletado com sucesso!" : "Houve um problema ao deletar usuario!";
                res.status(resposta.match("sucesso") ? 200 : 400 ).json({"Message":resposta});
                })
            }
        })
    }else{
        res.status(404).json({"Message":"Usuario nao encontrado!"});
    }
}

exports.testarBcrypt = (req, res) => {
    const saltRounds = 10;
    const myPlaintextPassword = 's0/\/\P4$$w0rD';
    const someOtherPlaintextPassword = 'not_bacon';

    //sync
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    bcrypt.compareSync(myPlaintextPassword, hash);

    res.status(200).json({"hash":`${hash}`,"length":`${hash.length}`});

}