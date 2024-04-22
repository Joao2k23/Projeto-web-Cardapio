import app from './src/app.js'
import conexao from './infra/conexao.js'

const port = 3000

//escutar porta
app.listen(port, () =>{
    console.log("servidor rodando!")
})

