const { Sequelize } = require('sequelize');
const  db = require('../config/connection');

  const producciongenero = db.define('producciongenero', {
    idProduccionGenero: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idProduccion: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    idGenero: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, { tableName: 'producciongenero', timestamps: false });

  module.exports = producciongenero;