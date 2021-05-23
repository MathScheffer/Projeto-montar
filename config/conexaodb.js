const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');
const { Sequelize } = require('sequelize');

exports.conexao =  mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"usuarios"
})

exports.conexaoAsync = async() =>{
    return await mysqlPromise.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"usuarios"
    })
}

exports.sequelize = new Sequelize('usuarios','root','',{
    host:'localhost',
    dialect:'mysql'
})

//module.exports = conexao;