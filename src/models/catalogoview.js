const Sequelize = require('sequelize');
const  db  = require('../config/connection');

const catalogoview = db.define('catalogoview', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    poster: {
      type: Sequelize.STRING,
    },
    titulo: {
      type: Sequelize.STRING,
    },
    categoria: {
      type: Sequelize.INTEGER,
      },
    genero: {
        type: Sequelize.STRING,
      },
    resumen: {
      type: Sequelize.TEXT,
    },
    temporadas: {
        type: Sequelize.STRING,
    },
    reparto: {
      type: Sequelize.STRING,
    },
      trailer: {
        type: Sequelize.TEXT,
    },
}, {
  tableName: 'catalogoview', 
  timestamps: false, 
});

module.exports = catalogoview;
