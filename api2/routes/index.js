module.exports = app => {
    require('./home.routes')(app);
    require('./persona.routes')(app);
    require('./pelicula.routes')(app);
    require('./person_movie.routes')(app);
}