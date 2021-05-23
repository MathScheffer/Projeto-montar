//Verifica se uma consulta que era para retornar somente um objeto não retornou dois
//exemplo: Uma consulta de usuário pelo nome, retornou dois usuários com o mesmo nome,
//ferindo a regra que usuários não podem ter nomes iguais
exports.retornaVariasLinhas = (arrayRows,queryParamName,queryParamValue) =>{
    return arrayRows.filter(obj => {
        obj[queryParamName] === queryParamValue
        console.log(obj[queryParamName],queryParamValue )
    });
}

exports.jsonToMap = (json) => {
    const keys = Object.keys(json);
    const values = Object.values(json);
    let map = new Map();
    keys.forEach((value,index) => {
        map.set(value,values[index]);
    })

    return map;
}

exports.geraMensagem = (status, message) => {
    return {
        status: status,
        response: message
    }
}
