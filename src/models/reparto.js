const { Sequelize } = require('sequelize');
const  db = require('../config/connection');

  const reparto = db.define('reparto', {
    idReparto: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idProduccion: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    idActor: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, { tableName: 'reparto', timestamps: false });

  module.exports = reparto;
  