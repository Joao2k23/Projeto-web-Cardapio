import express from 'express'
import conexao from '../infra/conexao.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json()) //middleware

//rotas
app.post("/order", (request, response) =>{

    const cartInfo = request.body;

    const sql = "INSERT INTO cardapio.order SET ?"
    conexao.query(sql, cartInfo, (erro, result) => {
        if(erro) {
            response.status(400).json({'erro': erro})
        }
        else{
            response.status(201).json(result)
        }
    })
})

export default app
