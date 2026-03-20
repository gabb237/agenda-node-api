const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Agenda = sequelize.define('Agenda', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Agenda;
