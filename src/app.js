import express from 'express'
import conexao from '../infra/conexao.js'

const app = express()

app.use(express.json())



//rotas
app.post("/", (request, response) =>{
    response.json({
        message: "rota funcionando"
    })
})

export default app
