import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // Para desabilitar os timestamps automáticos
  tableName: 'usuarios', // Definindo o nome da tabela
});

export default Usuario; // Exportando o modelo
