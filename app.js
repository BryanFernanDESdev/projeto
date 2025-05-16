// app.js
require('dotenv').config(); // Carrega o arquivo .env no início

const express = require('express');
const { sequelize } = require('./models'); // Importa o sequelize
const spotifyRoutes = require('./routes/spotifyRoutes');  // Importa as rotas do Spotify

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/spotify', spotifyRoutes);  // Usa as rotas do Spotify

// Sincroniza os modelos com o banco de dados
sequelize.sync({ force: false })  // Define 'force: true' para recriar as tabelas
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar os modelos:', err);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
