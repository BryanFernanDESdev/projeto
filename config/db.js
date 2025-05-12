const mysql = require("mysql2");
require("dotenv").config(); 

const connection = mysql.createConnection({
  host: process.env.DB_HOST,        // 'DB_HOST' é válido no .env
  user: process.env.DB_USER,        // 'DB_USER' é válido no .env
  port: process.env.DB_PORT,        // 'DB_PORT' é válido no .env
  password: process.env.DB_PASSWORD, // 'DB_PASSWORD' é válido no .env
  database: process.env.DB_NAME     // 'DB_NAME' mapeado para 'database'
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.stack);
    return;
  }
  console.log("✅ Conectado ao banco de dados!");
});

module.exports = connection;
