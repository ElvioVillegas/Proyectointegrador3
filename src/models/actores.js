const { Sequelize } = require('sequelize');
const  db = require('../config/connection');

  const actores = db.define('actores', {
    idActor: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreActor: {
      type: Sequelize.STRING(30),
      allowNull: false
    }
  }, { tableName: "actores", timestamps: false });

  module.exports = actores;