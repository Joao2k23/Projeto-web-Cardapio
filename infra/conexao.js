import mysql from 'mysql'

const conexao = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'@Jgmb0485',
    database:'cardapio'
})

conexao.connect((error) => {
    if(error){
        console.log("erro na conexão com o banco!")
    }
    else{
        console.log("Conexão realizada com o banco!!")
    }
})

export default conexao
