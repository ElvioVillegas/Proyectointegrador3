const { Sequelize } = require('sequelize');
const  db = require('../config/connection');

  const generos = db.define('generos', {
    idGenero: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreGenero: {
      type: Sequelize.STRING(30),
      allowNull: false
    }
  }, { tableName: 'generos', timestamps: false });

  module.exports = generos;
  