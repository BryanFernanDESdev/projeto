'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotifyUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SpotifyUser.init({
    usuario_id: DataTypes.INTEGER,
    spotify_user: DataTypes.STRING,
    access_token: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    token_expires_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SpotifyUser',
  });
  return SpotifyUser;
};