// Promise
// then catch
// async await

function log(etapa){
    return console.log(etapa + new Date().toLocaleTimeString())
}

function requisicaoSimulada(nome, tempoMs = 1500, deveFalhar = false){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(deveFalhar){
                reject(new Error(`Falha em ${nome}`)) //Erro
            }else{
                resolve(`${nome} concluída em ${tempoMs}ms`) //Sucesso
            }
        },tempoMs)
    })
}


function exemploThenCatch(){
    log("1. Início (sem await)");

    requisicaoSimulada("Buscar Usuário", 2000) //demora 2 segundos
        .then((resultado)=>{
            log(`3. Then ${resultado}`)
        })
        .catch((erro) => {
            console.log("Erro capturado com .catch" + erro.message)
        })

    log("2. Continuou o fluxo sem esperar a promise")
}

// exemploThenCatch()

async function exemploTryCatch(){
    log("1. Etapa com Async Await");
    try {
        const resultado = await requisicaoSimulada("Buscar Usuário", 5000)
        log("2. Resultado obtido com await" + resultado)
    } catch (error) {
        console.error(error.message)
    } //finally
    log("3. Só roda depois do Await")
}

exemploThenCatch()