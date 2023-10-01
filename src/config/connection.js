const dotenv = require('dotenv');
dotenv.config();

const {Sequelize} = require("sequelize");

const db = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 5, // Máximo de conexiones en el grupo
    min: 0, // Mínimo de conexiones en el grupo
    acquire: 30000, // Tiempo máximo, para liberar conexiones inactivas
    idle: 10000, // Tiempo máximo para cerrar conexiones inactivas
  },
});


/*
async function authenticate() {
     try {
       await db.authenticate();
       console.log("Conexion a la base de datos establecida correctamente");
     } catch (error) {
       console.error("Error al conectar a la base de Datos ", error);
   }
  };
  
   async function closeConnection() {
     try {
       await db.close();
      console.log("Conexión cerrada correctamente");
     } catch (error) {
       console.error("Error al cerrar la conexion ", error);
     }
   }; */

  


 /*  
async function testconnection() {
try {
     await db.authenticate();
    console.log("base de datos conectada");
} catch (error) {
  console.error("error al conectar la base de datos")
}
};


testconnection();
*/
module.exports = db;