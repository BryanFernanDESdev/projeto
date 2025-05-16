// models/Usuarios.js
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Garante que o email seja único
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // O modelo Usuario deve ser retornado aqui
  return Usuario;
};
