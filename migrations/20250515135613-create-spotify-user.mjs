// 20250515135613-create-spotify-user.js

// Importando o Sequelize dinamicamente (importação assíncrona)
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SpotifyUsers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      spotify_user: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      access_token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token_expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('SpotifyUsers');
  }
};
