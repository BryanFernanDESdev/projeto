require('dotenv').config(); // Carrega as variáveis de ambiente

const { Sequelize } = require('sequelize');

// Criando uma instância do Sequelize para testar a conexão
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nome do banco de dados
  process.env.DB_USER,     // Usuário do banco de dados
  process.env.DB_PASSWORD, // Senha do banco de dados
  {
    host: process.env.DB_HOST,  // Host do banco de dados
    dialect: process.env.DB_DIALECT || 'mysql', // Dialeto do banco de dados (mysql, postgres, etc.)
  }
);

// Função para testar a conexão
const testConnection = async () => {
  try {
    await sequelize.authenticate(); // Verifica se a conexão pode ser realizada
    console.log('Conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  } finally {
    await sequelize.close(); // Fecha a conexão
  }
};

// Executa o teste
testConnection();
