const functCallback = async(valb,callback) => {
    let  finalMessage = 0;  
    try{
        if(valb){
            finalMessage = valb+5;
        }else{
            finalmessage = valb+1
            console.log(finalMessage)
        }
    }catch(err){
        finalMessage = err;
    }

        
    if(callback){
        callback(null,finalMessage)
    }else{
        return finalMessage;
    }
}

functCallback(5,(err,val) => {
    if(err){
        console.log("Error message: ",err)
    }else{
        console.log("Valor final: ",val);
    }
})
const retornaOValor = async(valb) => {
    const val = await functCallback(valb);
    console.log(val)
}
retornaOValor(10)

const processador = require('./service/ProcessadorService');

processador.atualizarQuantidade(3,1)