// PROMESSA
                        // aceitou, recusou
const pedir = newPromisse((resolve, reject) => {
    console.log("Chamando Uber...")
    const motoristaAceito = false
    setTimeout(() => {
        if(motoristaAceito){
            resolve("O motorista aceitou")
        } else{
            reject("Nenhum motorista disponível")
        }
    }, 5000);
})

// pedir.then({msg:} => {
//     console.log(msg)
// }) catch(erro) => {
    
// }