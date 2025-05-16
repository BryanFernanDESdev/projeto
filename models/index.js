// models/index.js
const { Sequelize, DataTypes } = require('sequelize');

// Conectar ao banco de dados (ajuste conforme seu banco de dados)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',  // Dialeto para MySQL (ou altere conforme o seu banco)
  logging: false,    // Desabilita os logs SQL no console
});

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

// Importar os modelos
const Usuario = require('./Usuarios')(sequelize, DataTypes);
const SpotifyUser = require('./SpotifyUser')(sequelize, DataTypes);

// Definir as associações (caso existam entre os modelos)
// Exemplo:
// Usuario.hasMany(SpotifyUser);
// SpotifyUser.belongsTo(Usuario);

// Sincronizar as tabelas com o banco de dados (apenas no desenvolvimento)
sequelize.sync({ alter: true }).then(() => {
  console.log('Tabelas sincronizadas com sucesso!');
}).catch((err) => {
  console.error('Erro ao sincronizar as tabelas:', err);
});

// Exportar os modelos e a instância do sequelize
module.exports = { sequelize, Usuario, SpotifyUser, Sequelize, DataTypes };
