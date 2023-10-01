const { Sequelize } = require('sequelize');
const  db = require('../config/connection');

  const categorias = db.define('categorias', {
    idCategoria: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreCategoria: {
      type: Sequelize.STRING(30),
      allowNull: false
    }
  }, { tableName: 'categorias', timestamps: false });

  module.exports = categorias;
  