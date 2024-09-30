const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.personas = require("./persona.model.js")(sequelize, Sequelize);
db.peliculas = require("./pelicula.model.js")(sequelize, Sequelize);
db.person_movie = require("./person_movie.model.js")(sequelize, Sequelize);

// Relaciones entre personas y person_movie
db.personas.belongsToMany(db.peliculas, {
    through: db.person_movie,
    foreignKey: "person_id",
    otherKey: "movie_id",
});
db.peliculas.belongsToMany(db.personas, {
    through: db.person_movie,
    foreignKey: "movie_id",
    otherKey: "person_id",
});

module.exports = db;