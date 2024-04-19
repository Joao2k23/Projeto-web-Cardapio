import mysql from 'mysql'

const conexao = mysql. createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'@Jgmb0485',
    database:'projeto_cardapio'
})

export default conexao
