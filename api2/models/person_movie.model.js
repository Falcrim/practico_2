module.exports = (sequelize, Sequelize) => {
    const Person_Movie = sequelize.define("person_movie", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        person_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        movie_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Person_Movie;
}