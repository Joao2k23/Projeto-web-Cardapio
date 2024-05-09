import express from 'express'
import conexao from '../infra/conexao.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.post("/order", (request, response) => {
    const {total, products} = request.body

    const sqlOrder = "INSERT INTO carpadio_teste.Orders SET ?"
    conexao.query(sqlOrder, { total }, (erro, result) => {
        if (erro) {
            response.status(400).json({ 'erro': erro })
        } else {
            const orderId = result.insertId

            products.forEach(product => {
                const sqlProduct = "INSERT INTO carpadio_teste.OrderItems SET ?"

                conexao.query(sqlProduct,{...product, order_id: orderId}, (erro, result)=> {
                    if (erro) {
                        response.status(400).json({'erro': erro})
                    }
                })
            })

            response.status(201).json({ orderId, result }) // Enviando o orderId na resposta
        }
    })
})

export default app;
