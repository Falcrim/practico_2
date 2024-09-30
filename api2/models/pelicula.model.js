module.exports = (sequelize, Sequelize) => {
    const Pelicula = sequelize.define("pelicula", {
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fecha_estreno: {
            type: Sequelize.DATE,
            allowNull: false
        },
        sinopsis: {
            type: Sequelize.STRING,
            allowNull: false
        },
        trailer: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rotten_tomatoes: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
    });
    return Pelicula;
}