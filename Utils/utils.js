const Computador = require('../model/Computador');
class Utils{
    
//Verifica se uma consulta que era para retornar somente um objeto não retornou dois
//exemplo: Uma consulta de usuário pelo nome, retornou dois usuários com o mesmo nome,
//ferindo a regra que usuários não podem ter nomes iguais
    static retornaVariasLinhas = (arrayRows,queryParamName,queryParamValue) =>{
        return arrayRows.filter(obj => {
            obj[queryParamName] === queryParamValue
        });
    }
    
    static jsonToMap = (json) => {
        const keys = Object.keys(json);
        const values = Object.values(json);
        let map = new Map();
        keys.forEach((value,index) => {
            map.set(value,values[index]);
        })
    
        return map;
    }
    
    static geraMensagem = (status, message) => {
        return {
            status: status,
            response: message
        }
    }
    
    static retornaCamposFaltantes = (reqBody,entradasValidas) => {
        const body =  this.jsonToMap(reqBody);
        const camposNecessarios = entradasValidas;
        const camposFaltantes = [];
        camposNecessarios.forEach(key => {
            if(!body.has(key)){
                camposFaltantes.push(key);
            }
        });
    
        if(camposFaltantes.length > 0){
            return camposFaltantes.toString();
        }else{
            return false;
        }
    }
    
    static validarEntradasInvalidas(bodyMap,entradasValidas){
        const paramsName = entradasValidas;
        let  entradasInvalidas = [];
    
        bodyMap.forEach((value,key) => {
            if(paramsName.find(param=>param === key) == undefined){
                entradasInvalidas.push(key)
            }
        })

        return entradasInvalidas;
    }

    static isErrno1452(err){
        return err.name === "SequelizeForeignKeyConstraintError"
        && err.original.errno == 1452
    }

    static computadorAgora(){
        let  computador_agora = new Map();

        Computador.integradorMontagem.forEach((value,key) => {
            computador_agora[key] = JSON.parse(JSON.stringify(value));
        })

        return computador_agora;
    }

    static sequelizeModelToJson(sequelizeModel){
        return sequelizeModel? JSON.parse(JSON.stringify(sequelizeModel)) : false;
    }
}


module.exports = Utils;