# Documentación del Tercer Proyecto Integrador

Este proyecto utiliza Node.js, Express, Sequelize y MySQL para crear una API REST que permite interactuar con datos de series y peliculas de la base de datos Trailerflix. A continuación, se detallan los principales componentes y endpoints de la API.


## Modelo Físico.

### Para crear el modelo físico utilizé db designer.

![Modelo Api Trailerflix](<modelo-fisico-trailerflix (3).png>)


## Base de Datos.

#### La base de datos la realizé en MySQL, denominandola `TRAILERFLIX`.

#### Codigo sql para crear la Base de datos.

```sql
CREATE DATABASE trailerflix;
```

#### Codigo sql para crear las tablas. Ejemplo

```sql
USE trailerflix; 

CREATE TABLE produccion (
    idProduccion INT AUTO_INCREMENT PRIMARY KEY,
    poster VARCHAR(255),
    titulo VARCHAR(255),
    idCategoria INT,
    resumen TEXT,
    temporadas INT,
    trailer VARCHAR(255)
);
```
#### Codigo sql para insertar los datos a las tablas. Ejemplo

```sql
INSERT INTO trailerflix.categorias 
VALUES ('null', 'series')
('null', 'peliculas');
```


Esta documentación describe los principales endpoints de la API y la estructura de carpetas del proyecto. Configurar las variables de entorno en el archivo `.env` para que la conexión a la base de datos funcione correctamente.

## Archivo `.env`

### Configuración de la base de datos
```plaintext

PORT=3006
DB_SCHEMA=trailerflix
DB_USER=root
DB_PASSWORD=tu_clave_secreta
DB_HOST=localhost

```

En este archivo:

- `DB_SCHEMA`: Debes especificar el nombre del esquema de tu base de datos MySQL (en este caso, "trailerflix").
- `DB_USER`: Especifica el nombre de usuario de MySQL (puede ser "root" u otro).
- `DB_PASSWORD`: Proporciona la contraseña de MySQL correspondiente al usuario especificado.
- `DB_HOST`: Indica la dirección del servidor de la base de datos (generalmente "localhost" para desarrollo local).
- `PORT`: El puerto en el que deseas que tu servidor Express escuche las solicitudes (en este caso, 3006).

Asegúrate de que estos valores coincidan con la configuración de tu base de datos y servidor Express.

## Codigo sql para crear la vista.

```sql
VIEW_NAME=catalogoview
VIEW_QUERY=SELECT 
        `p`.`idProduccion` AS `id`,
        `p`.`poster` AS `poster`,
        `p`.`titulo` AS `titulo`,
        `c`.`nombreCategoria` AS `categoria`,
        GROUP_CONCAT(DISTINCT `g`.`nombreGenero`
            SEPARATOR ',') AS `genero`,
        `p`.`resumen` AS `resumen`,
        `p`.`temporadas` AS `temporadas`,
        GROUP_CONCAT(DISTINCT `a`.`nombreActor`
            SEPARATOR ',') AS `reparto`,
        `p`.`trailer` AS `trailer`
    FROM
        (((((`produccion` `p`
        LEFT JOIN `categorias` `c` ON ((`p`.`idCategoria` = `c`.`idCategoria`)))
        LEFT JOIN `producciongenero` `pg` ON ((`p`.`idProduccion` = `pg`.`idProduccion`)))
        LEFT JOIN `generos` `g` ON ((`pg`.`idGenero` = `g`.`idGenero`)))
        LEFT JOIN `reparto` `r` ON ((`p`.`idProduccion` = `r`.`idProduccion`)))
        LEFT JOIN `actores` `a` ON ((`r`.`idActor` = `a`.`idActor`)))
    GROUP BY `p`.`idProduccion`
```

En este ejemplo:

- `VIEW_NAME`: Especifica el nombre de la vista que debes crear en tu base de datos (en este caso, "catalogoview").
- `VIEW_QUERY`: Proporciona la consulta SQL que utilizaras para crear la vista en tu base de datos.


## Inicio del Servidor

El servidor se inicia utilizando el siguiente comando:

```bash
npm start
```

El servidor escuchará en el puerto especificado en el archivo `.env` o en el puerto 3000 por defecto.

---

## Estructura de Carpetas

El proyecto está organizado en la siguiente estructura de carpetas:

- `src/`
  - `config/`: Contiene el archivo `connection.js` que establece la conexión a la base de datos MySQL.
  - `models/`: Contiene los modelos de Sequelize para las tablas `Produccion`, `Generos`, `Actores`, `Categorias`, `Reparto`, `ProduccionGenero` y `Catalogoview`.
- `.env`: Archivo de configuración de variables de entorno para la conexión a la base de datos.
- `package.json`: Archivo de configuración de dependencias y scripts.
- `server.js`: Archivo principal que inicia el servidor Express y define los endpoints de la API.

## Endpoints

A continuación, se detallan los endpoints disponibles y cómo utilizarlos:

## Categorías

### Listar todas las categorías

- **URL**: `/categorias`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "idCategoria": 1,
        "nombreCategoria": "series"
      },
      {
        "idCategoria": 2,
        "nombreCategoria": "peliculas"
      }
    ]
    ```

## Catalogo

### Obtener el Catalogo completo de series/peliculas.

- **URL**: `/catalogo`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:
    
    ```json
    [
     {
      "id": 1,
      "poster": "/posters/1.jpg",
      "titulo": "The Crown",
      "categoria": "series",
      "genero": "Drama,Hechos Verídicos",
      "resumen": "Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX.",
      "temporadas": "4",
      "reparto": "Claire Fox,Helena Bonham Carter,Matt Smith,Olivia Colman,Tobias Menzies,Vanesa Kirby",
      "trailer": "trailerURL"
     },
     {
      "id": 2,
      "poster": "/posters/2.jpg",
      "titulo": "Riverdale",
      "categoria": "series",
      "genero": "Drama,Ficción,Misterio",
      "resumen": "El paso a la edad adulta incluye sexo, romance, escuela y familia. Para Archie y sus amigos, también hay misterios oscuros.",
      "temporadas": "5",
      "reparto": "Camila Mendes,Casey Cott,Lili Reinhart,Mädchen Amick,Madelaine Petsch,Marisol Nichols",
      "trailer": "trailerURL"
     },
     ...
    ]
    ```

    
### Obtener una serie/pelicula por su ID.

- **URL**: `/catalogo/:id`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:
    
    ```json
    {
      "id": 30,
      "poster": "/posters/30.jpg",
      "titulo": "The Martian",
      "categoria": "peliculas",
      "genero": "Aventura,Ciencia Ficción,Drama",
      "resumen": "Durante una misión a Marte de la nave tripulada Ares III, una fuerte tormenta se desata dando por desaparecido y muerto al astronauta Mark Watney (Matt Damon), sus compañeros toman la decisión de irse pero él ha sobrevivido. Está solo y sin apenas recursos en el planeta. Con muy pocos medios deberá recurrir a sus conocimientos, su sentido del humor y un gran instinto de supervivencia para lograr sobrevivir y comunicar a la Tierra que todavía está vivo esperando que acudan en su rescate.",
      "temporadas": "N/A",
      "reparto": "Jeff Daniels,Jessica Chastain,Kate Mara,Kristen Wiig,Matt Damon,Michael Peña,Sean Bean",
      "trailer": "https://www.youtube.com/embed/XvB58bCVfng"
    }
    ```

### Buscar una serie/pelicula por su titulo.

- **URL**: `/catalogo/titulo/:titulo`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:
   
    ```json
    {
      "id": 18,
      "poster": "/posters/18.jpg",
      "titulo": "Ava",
      "categoria": "peliculas",
      "genero": "Acción,Drama,Suspenso",
      "resumen": "Ava es una mortífera asesina a sueldo que trabaja para una organización de operaciones encubiertas, que viaja por todo el mundo acabando con aquellos objetivos que nadie más puede   derribar. Cuando uno de sus encargos sale mal, Ava tendrá que luchar por su vida.",
      "temporadas": "N/A",
      "reparto": "Colin Farrell,Common,Geena Davis,Ioan Gruffudd,Jessica Chastain,John Malkovich",
      "trailer": "trailerURL"
    }
    ```

### Buscar una serie/pelicula por su genero.

- **URL**: `/catalogo/genero/:query`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:
   
    ```json
    [
      {
        "id": 8,
        "poster": "/posters/8.jpg",
        "titulo": "Avengers: End Game",
        "categoria": "peliculas",
        "genero": "Acción,Aventura,Ciencia Ficción",
        "resumen": "Después de los devastadores eventos de los Vengadores: Infinity War (2018), el universo está en ruinas. Con la ayuda de los aliados restantes, los Vengadores se reúnen una vez más para revertir las acciones de Thanos y restaurar el equilibrio del universo.",
        "temporadas": "N/A",
        "reparto": "Chris Evans,Chris Hemsworth,Jeremy Renner,Mark Ruffalo,Robert Downey Jr.,Scarlett Johansson",
        "trailer": "trailerURL"
      },
      {
        "id": 18,
        "poster": "/posters/18.jpg",
        "titulo": "Ava",
        "categoria": "peliculas",
        "genero": "Acción,Drama,Suspenso",
        "resumen": "Ava es una mortífera asesina a sueldo que trabaja para una organización de operaciones encubiertas, que viaja por todo el mundo acabando con aquellos objetivos que nadie más puede derribar. Cuando uno de sus encargos sale mal, Ava tendrá que luchar por su vida.",
       "temporadas": "N/A",
       "reparto": "Colin Farrell,Common,Geena Davis,Ioan Gruffudd,Jessica Chastain,John Malkovich",
       "trailer": "trailerURL"
      },
    ...
    ]
    ```
### Buscar una serie/pelicula por su categoría.

- **URL**: `/productos/categoria/:query`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:
   
    ```json
    [
     {
    "id": 6,
    "poster": "/posters/6.jpg",
    "titulo": "Enola Holmes",
    "categoria": "peliculas",
    "genero": "Drama,Ficción,Misterio",
    "resumen": "La hermana menor de Sherlock, descubre que su madre ha desaparecido y se dispone a encontrarla. En su búsqueda, saca a relucir el sabueso que corre por sus venas y se encuentra con una conspiración que gira en torno a un misterioso lord, demostrando que su ilustre hermano no es el único talento en la familia.",
    "temporadas": "N/A",
    "reparto": "Adeel Akhtar,Helena Bonham Carter,Henry Cavill,Louis Partridge,Millie Bobby Brown,Sam Claflin",
    "trailer": "trailerURL"
    },
    {
    "id": 7,
    "poster": "/posters/7.jpg",
    "titulo": "Guasón",
    "categoria": "peliculas",
    "genero": "Crimen,Drama,Suspenso",
    "resumen": "Arthur Fleck (Phoenix) es un hombre ignorado por la sociedad, cuya motivación en la vida es hacer reír. Pero una serie de trágicos acontecimientos le llevarán a ver el mundo de otra forma. Película basada en el popular personaje de DC Comics Joker, conocido como archivillano de Batman, pero que en este film tomará un cariz más realista y oscuro.",
    "temporadas": "N/A",
    "reparto": "Brett Cullen,Frances Conroy,Joaquin Phoenix,Robert De Niro,Shea Whigham,Zazie Beetz",
    "trailer": "https://www.youtube.com/embed/zAGVQLHvwOY"
    },
    ...
    ]
    ```

### Listar todos los generos.

- **URL**: `/generos`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "idGenero": 1,
        "nombreGenero": "Acción"
      },
      {
        "idGenero": 2,
        "nombreGenero": "Ciencia Ficción"
      },
      ...
    ]
    ```

 ### Listar todos los actores

- **URL**: `/actores`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "idActor": 1,
        "nombreActor": "Pedro Pascal"
      },
      {
        "idActor": 2,
        "nombreActor": "Carl Weathers"
      },
      ...
    ]
    ```
 ### Listar todas las producciones.

- **URL**: `/produccion`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
     {
       "idProduccion": 1,
       "poster": "/posters/1.jpg",
       "titulo": "The Crown",
       "idCategoria": 1,
       "resumen": "Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX.",
       "temporadas": "4",
       "trailer": "trailerURL"
     },
     {
       "idProduccion": 2,
       "poster": "/posters/2.jpg",
       "titulo": "Riverdale",
       "idCategoria": 1,
       "resumen": "El paso a la edad adulta incluye sexo, romance, escuela y familia. Para Archie y sus amigos, también hay misterios oscuros.",
      "temporadas": "5",
      "trailer": "trailerURL"
     },
     ...
    ]
    ```


## Tabla `Reparto`

La tabla `Reparto` se utiliza para mantener un registro de las relaciones entre las producciones y los actores. Esta tabla es esencial para implementar una relación de muchos a muchos entre las producciones y los actores, ya que permite asociar múltiples actores con múltiples producciones.

### Esquema de la tabla

| Campo         | Tipo   | Descripción                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| `idReparto`          | Entero | Identificador único de la relación.                           |
| `idProduccion`     | Entero | Clave foránea que hace referencia a la tabla `Produccion`. |
| `idActor` | Entero | Clave foránea que hace referencia a la tabla `Actores`.     |

### Relaciones

- `idProduccion`: Esta columna se relaciona con la tabla `Produccion` y representa una produccion a la que se asocia con un actor.
- `idActor`: Esta columna se relaciona con la tabla `Actores` y representa un actor a la que se asocia con una producción.

### Ejemplo de uso

Supongamos que tenemos las siguientes entradas en la tabla `Reparto`:

| idReparto  | idProduccion |   idActor   |
| --- | -------      | ----------- |
| 1   | 1          | 25           |
| 2   | 1         | 26           |
| 3   | 1         | 27           |

Esto indica que:
- La producción con `id` 1 está asociada al actor con `id` 25.
- La producción con `id` 1 está asociada al actor con `id` 26.
- La producción con `id` 1 está asociada al actor con `id` 27.


### Endpoints de Reparto.

Aquí se describen los endpoints relacionados con esta funcionalidad.

#### Obtener todos los registros de Reparto

- **URL**: `/reparto`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "idReparto": 1,
        "idProduccion": 1,
        "idActor": 25
      },
      {
        "idReparto": 2,
        "idProduccion": 1,
        "idActor": 26
      },
      ...
    ]
    ```


## Tabla `ProduccionGenero`

La tabla `ProduccionGenero` se utiliza para mantener un registro de las relaciones entre las producciones y los generos. Esta tabla es esencial para implementar una relación de muchos a muchos entre las producciones y los generos, ya que permite asociar múltiples generos con múltiples producciones.

### Esquema de la tabla

| Campo         | Tipo   | Descripción                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| `idProducciongenero`          | Entero | Identificador único de la relación.                           |
| `idProduccion`     | Entero | Clave foránea que hace referencia a la tabla `Produccion`. |
| `idGenero` | Entero | Clave foránea que hace referencia a la tabla `Generos`.     |

### Relaciones

- `idProduccion`: Esta columna se relaciona con la tabla `Produccion` y representa una produccion a la que se asocia con un genero.
- `idGenero`: Esta columna se relaciona con la tabla `Generos` y representa un genero a la que se asocia con una producción.

### Ejemplo de uso

Supongamos que tenemos las siguientes entradas en la tabla `ProduccionGenero`:

| idProduccionGenero  | idProduccion |   idGenero   |
| --- | -------      | ----------- |
| 1   | 1          | 4           |
| 2   | 1         | 8           |
| 3   | 2         | 4           |

Esto indica que:
- La producción con `id` 1 está asociada al genero con `id` 4.
- La producción con `id` 1 está asociada al genero con `id` 8.
- La producción con `id` 2 está asociada al genero con `id` 4.


### Endpoints de ProduccionGenero.

Aquí se describen los endpoints relacionados con esta funcionalidad.

#### Obtener todos los registros de ProduccionGenero.

- **URL**: `/ProduccionGenero`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "idProduccionGenero": 1,
        "idProduccion": 1,
        "idGenero": 4
      },
      {
        "idProduccionGenero": 2,
        "idProduccion": 1,
        "idGenero": 8
      },
      ...
    ]
    ```

### Errores

La API devuelve mensajes de error con los códigos de estado correspondientes en caso de que ocurran problemas. 



