import app from './src/app.js'

import conexao from './infra/conexao.js'

const port = 3000


//fazendo a conexão
conexao.connect((error) => {
    if(error){
        console.log("erro na conexão!!")
    }
    else{
        console.log("Conexão feita com sucesso!")

        //escutar porta
        app.listen(port, () =>{
            console.log("servidor rodando!")
        })
    }
})

