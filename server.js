const express = require("express");
const app = express();

const db = require('./src/config/connection');
const generos = require('./src/models/generos');
const categorias = require('./src/models/categorias');
const actores = require('./src/models/actores');
const produccion = require('./src/models/produccion');
const reparto = require('./src/models/reparto');
const producciongenero = require('./src/models/producciongenero');
const catalogoview = require('./src/models/catalogoview');
const { Op } = require('sequelize');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(async (req, res, next) => {
      try {
        await db.authenticate();
        next();
      } catch (error) {
        res
          .status(500)
          .json({ error: "Error en el servidor", description: error.message });
      }
    });

 
 
// Ruta de Inicio.
app.get("/", (req, res) => {
  res.status(200).end("Bienvenidos a TRAILERFLIX");
});


// Ruta para obtener todas las Categorias de trailerflix.
app.get('/categorias', async (req, res) => {
  try {
        const allCategorias = await categorias.findAll();

      allCategorias.length !== 0 ? res.status(200).json(allCategorias)
              : res.status(404).json({ error: "No se encontraron Categorias para listar." });

  } catch (error) {
        res.status(500).json({ error: 'Error en el servidor', description: error.message });
  }
});

// Ruta para obtener el catalogo completo de trailerflix.
app.get('/catalogo', async (req, res) => {
  try {
        const allCatalogo = await catalogoview.findAll();

      allCatalogo.length !== 0 ? res.status(200).json(allCatalogo)
              : res.status(404).json({ error: "No se encontró Catalogo para mostrar." });

  } catch (error) {
        res.status(500).json({ error: 'Error en el servidor', description: error.message });
  }
});

// Ruta para obtener series o peliculas por su id del catalogo de trailerflix.
app.get('/catalogo/:id', async (req, res) => {
  try {
        const { id } = req.params;
        const produccion = await catalogoview.findByPk(id);

        !produccion? res.status(404).json({ error: "serie o pelicula no encontrada." })
                 : res.status(200).json(produccion);
  } catch (error) {
        res.status(500).json({ error: 'Error en el servidor', 
                               description: error.message });

  }
});

// Ruta para obtener series o peliculas por su titulo del catalogo de trailerflix.
app.get('/catalogo/titulo/:titulo', async (req, res) => {
  try {
        const { titulo } = req.params;
        const catalogo = await catalogoview.findOne({ where: { titulo } });

        !catalogo ? res.status(404).json({ error: 'serie o pelicula no encontrada' })
                 : res.status(200).json(catalogo);
  } catch (error) {
        res.status(500).json({ error: 'Error en el servidor', description: error.message });
  }
});

// Ruta para obtener series o peliculas por su genero del catalogo de trailerflix.
app.get('/catalogo/genero/:query', async (req, res) => {
  try {
        const { query } = req.params;
        const catalogo = await catalogoview.findAll({
              where: { genero: {
                          [Op.like]: `%${ query }%`,
                       },
              },
        });

        catalogo.length !== 0 ? res.status(200).json(catalogo)
                              : res.status(404).json({ error: "No se encontraron series o peliculas para mostrar." });
  } catch (error) {
        res.status(500).json({ error: 'Error en el servidor', description: error.message });
  }
});

// Ruta para obtener series o peliculas por su categoria del catalogo de trailerflix.
app.get('/catalogo/categoria/:query', async (req, res) => {
  try {
        const { query } = req.params;
        const catalogo = await catalogoview.findAll({
              where: { categoria: {
                          [Op.like]: `%${ query }%`,
                       },
              },
        });

        catalogo.length !== 0 ? res.status(200).json(catalogo)
                              : res.status(404).json({ error: "No se encontraron series o peliculas para mostrar." });
  } catch (error) {
        res.status(500).json({ error: 'Error en el servidor', description: error.message });
  }
});

// Ruta para obtener todos los Generos de trailerflix.
app.get('/generos', async (req, res) => {
      try {
            const allGeneros = await generos.findAll();
    
            allGeneros.length !== 0 ? res.status(200).json(allGeneros)
                  : res.status(404).json({ error: "No se encontraron Generos para mostrar." });
    
      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', description: error.message });
      }
    });
    
    // Ruta para obtener todos los Actores de trailerflix.
    app.get('/actores', async (req, res) => {
      try {
            const allActores = await actores.findAll();
    
          allActores.length !== 0 ? res.status(200).json(allActores)
                  : res.status(404).json({ error: "No se encontraron Actores para mostrar." });
    
      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', description: error.message });
      }
    });

    // Ruta para obtener todas las Producciones de trailerflix.
app.get('/produccion', async (req, res) => {
      try {
            const allProducciones = await produccion.findAll();
    
          allProducciones.length !== 0 ? res.status(200).json(allProducciones)
                  : res.status(404).json({ error: "No se encontraron Producciones para mostrar." });
    
      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', description: error.message });
      }
    });
    
    // Ruta para obtener todos los Actores de trailerflix.
    app.get('/reparto', async (req, res) => {
      try {
            const allReparto = await reparto.findAll();
    
          allReparto.length !== 0 ? res.status(200).json(allReparto)
                  : res.status(404).json({ error: "No se encontro información para mostrar." });
    
      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', description: error.message });
      }
    });
    
    // Ruta para obtener todos los generos de trailerflix
    app.get('/producciongenero', async (req, res) => {
      try {
            const allProducciongenero = await producciongenero.findAll();
    
          allProducciongenero.length !== 0 ? res.status(200).json(allProducciongenero)
                  : res.status(404).json({ error: "No se encontro información para mostrar." });
    
      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', description: error.message });
      }
    });
    

// Ruta para manejar las solicitudes a rutas no existentes
app.get("*", (req, res) => {
      res.status(404).send("Lo sentimos, la página que buscas no existe.");
    });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`--------Servidor escuchando en el puerto ${PORT}`);
  });