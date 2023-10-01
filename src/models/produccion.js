const Sequelize = require('sequelize');
const  db  = require('../config/connection');

const produccion = db.define('produccion', {
    idProduccion: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    poster: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    titulo: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    idCategoria: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    resumen: {
      type: Sequelize.TEXT(200),
      allowNull: false,
    },
    temporadas: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    trailer: {
        type: Sequelize.TEXT(100),
        allowNull: false,
    }
},
  { tableName: 'produccion', timestamps: false }
);

module.exports = produccion;
