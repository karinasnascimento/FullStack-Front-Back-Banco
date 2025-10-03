const express = require("express")
const mysql = require("mysql2/promise")
const app = express(); // express era uma variável e passou a ser uma função ()
const cors = require("cors");

app.use(express.json());
app.use(cors());
const PORT = 3000;

const conexao = mysql.createPool({
    user: "root",
    password: "1234",
    database: "escola_db",
    host: "localhost",
    port: 3306,
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0
});


(async() => {
    try{
        const conn = await conexao.getConnection();
        console.log("Banco conectado com sucesso")
        conn.release();
    } catch (error) {
        console.log("Erro ao conectar ao banco", error.message)
    }
})();

//get não pega nada do body (req), ele só traz a resposta (res)
app.get("/", (req,res) => {
    res.status(200).json({msg: "Hello World 🌎"});
});

app.get("/alunos", async (req,res) => {
    try {
        const [resultado] = await conexao.query("SELECT * FROM alunos");
        res.status(200).json(resultado)
    } catch (error) {
        console.error(error)
        res.status(500).json({erro: "Erro ao buscar alunos"})
    }
})

app.post("/alunos", async (req, res) =>{
    const {nome, cpf, cep, uf, rua, numero, complemento} = req.body

    if(!nome || !cpf) return res.status(400).json({ msg: "Nome e CPF são obrigatórios"})

    const  sql = `
    INSERT INTO alunos
        (nome, cpf, cep, uf, rua, numero, complemento)
    VALUES
        (?, ?, ?, ?, ?, ?, ?)
    `
    const parametro = [nome, cpf, cep, uf, rua, numero, complemento];

    //substitui os espaços vazios de VALUES(?) por valores reais
    const [resultado] = await conexao.execute(sql, parametro);

    const novoAluno = await conexao.execute(`
        SELECT * FROM alunos WHERE id = ${resultado.insertId}`);

    res.status(201).json(novoAluno)
})

app.listen(PORT,() => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});