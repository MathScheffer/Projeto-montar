exports.uniqueConstraintErrorUsuario = (errorsArray) => {
    let mensagem = [];

    errorsArray.forEach(obj => {
        if (obj.message.startsWith("username") && obj.message.endsWith("must be unique")) 
            mensagem.push("username");
        if (obj.message.startsWith("nome") && obj.message.endsWith("must be unique")) 
            mensagem.push("nome");
        if (obj.message.startsWith("email") && obj.message.endsWith("must be unique")) 
            mensagem.push("email");
    })

    return mensagem;
}