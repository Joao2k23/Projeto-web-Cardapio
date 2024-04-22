import express from 'express'
import conexao from '../infra/conexao.js'

const app = express()

app.use(express.json()) //middleware



//rotas
app.post("/order", (request, response) =>{
    const {id, name, quantity, price, total} = request.body

    const cartInfo = request.body;

    const sql = "INSERT INTO order SET ?"
    conexao.query(sql, cartInfo, (erro, result) => {
        if(erro) {
            response.status(400).json({'erro': erro})
        }
        else{
            response.status(201).json(resultado)
        }
    })
})

export default app
