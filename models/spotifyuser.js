// models/SpotifyUser.js
module.exports = (sequelize, DataTypes) => {
  const SpotifyUser = sequelize.define('SpotifyUser', {
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuarios',  // Refere-se à tabela "Usuarios"
        key: 'id',
      },
    },
    spotify_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token_expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return SpotifyUser;
};
