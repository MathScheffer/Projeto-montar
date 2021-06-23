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

    return mensagem.toString();
}

exports.uniqueConstraintErrorRam = (errorsArray) => {
    let mensagem = [];

    errorsArray.forEach(obj => {
        if (obj.message.startsWith("nome") && obj.message.endsWith("must be unique")) 
            mensagem.push("nome");
    })

    return mensagem;
}

exports.uniqueConstraintErrorProcessador = (errorsArray) => {
    let mensagem = [];

    errorsArray.forEach(obj => {
        if (obj.message.startsWith("nome") && obj.message.endsWith("must be unique")) 
            mensagem.push("nome");
    })

    return mensagem;
}
exports.uniqueConstraintErrorPlacaMae = (errorsArray) => {
    let mensagem = [];

    errorsArray.forEach(obj => {
        if (obj.message.startsWith("nome") && obj.message.endsWith("must be unique")) 
            mensagem.push("nome");
    })

    return mensagem;
}
exports.uniqueConstraintErrorArmazenamento = (errorsArray) => {
    let mensagem = [];

    errorsArray.forEach(obj => {
        if (obj.message.startsWith("nome") && obj.message.endsWith("must be unique")) 
            mensagem.push("nome");
    })

    return mensagem;
}
exports.uniqueConstraintErrorVga = (errorsArray) => {
    let mensagem = [];

    errorsArray.forEach(obj => {
        if (obj.message.startsWith("nome") && obj.message.endsWith("must be unique")) 
            mensagem.push("nome");
    })

    return mensagem;
}
exports.uniqueConstraintErrorFonte = (errorsArray) => {
    let mensagem = [];

    errorsArray.forEach(obj => {
        if (obj.message.startsWith("nome") && obj.message.endsWith("must be unique")) 
            mensagem.push("nome");
    })

    return mensagem;
}
exports.errno1452Computador = (err) => {
    const tableError = err.table;
    let errorMessage;
    switch(tableError){
        case "usuario":
            errorMessage = "Usuario nao cadastrado!";
        break;
        case "processador":
            errorMessage = "Processador nao disponivel!";
        break;
        case "placamae":
            errorMessage = "Placa Mae nao disponivel!";
        break;
        case "ram":
            errorMessage = "Memoria Ram nao disponivel!";
        break;
        case "armazenamento":
            errorMessage = "Armazenamento(HD/SSD) selecionado nao disponivel!";
        break;
        case "fonte":
            errorMessage = "Fonte nao disponivel!";
        break;
        case "vga":
            errorMessage = "Vga nao disponivel!";
        break;
    }
    return errorMessage;
}
exports.validationErrors = () =>{}