module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/person_movie.controller");

    router.post('/', controller.addPersonMovie);
    router.delete('/:id', controller.deleteMovie);

    // router.get('/:id', controller.getPersonaById);
    // router.post('/', controller.createPersona);
    // router.put('/:id', controller.updatePersonaPut);
    // router.patch('/:id', controller.updatePersonaPatch);
    // router.post('/:id/foto', controller.uploadPicture);
    app.use('/reparto', router);

};