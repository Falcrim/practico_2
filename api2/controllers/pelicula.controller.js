const { where, or } = require("sequelize");
const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");


exports.listPelicula = async (req, res) => {
    try {
        // const peliculas = await db.peliculas.findAll();
        const peliculas = await db.peliculas.findAll({
            include: "personas",
            order: [
                ['rotten_tomatoes', 'DESC']
            ]
        });
        //for each movie print the actors and their roles
        // peliculas.forEach(pelicula => {
        //     console.log(pelicula.titulo);
        //     pelicula.personas.forEach(persona => {
        //         console.log(persona.person_movie.role, persona.nombre);
        //     });
        // }
        // );
        res.json(peliculas);
    } catch (error) {
        sendError500(error);
    }
}

exports.getPeliculaById = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res);
        if (!pelicula) {
            return;
        }
        res.json(pelicula);
    } catch (error) {
        sendError500(error);
    }
}

exports.createPelicula = async (req, res) => {

    const requiredFields = ['titulo', 'fecha_estreno', 'sinopsis', 'trailer', 'rotten_tomatoes'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const pelicula = {
            titulo: req.body.titulo,
            fecha_estreno: req.body.fecha_estreno,
            sinopsis: req.body.sinopsis,
            trailer: req.body.trailer,
            rotten_tomatoes: req.body.rotten_tomatoes
        }
        const peliculaCreada = await db.peliculas.create(pelicula);

        res.status(201).json(peliculaCreada);
    } catch (error) {
        sendError500(error);
    }
}
exports.updatePeliculaPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res);
        if (!pelicula) {
            return;
        }
        pelicula.titulo = req.body.titulo || pelicula.titulo;
        pelicula.fecha_estreno = req.body.fecha_estreno || pelicula.fecha_estreno;
        pelicula.sinopsis = req.body.sinopsis || pelicula.sinopsis;
        pelicula.trailer = req.body.trailer || pelicula.trailer;
        pelicula.rotten_tomatoes = req.body.rotten_tomatoes || pelicula.rotten_tomatoes;

        await pelicula.save();
        res.json(pelicula);
    } catch (error) {
        sendError500(error);
    }
}
exports.updatePeliculaPut = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res);
        if (!pelicula) {
            return;
        }
        const requiredFields = ['titulo', 'fecha_estreno', 'sinopsis', 'trailer', 'rotten_tomatoes'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        pelicula.titulo = req.body.titulo;
        pelicula.fecha_estreno = req.body.fecha_estreno;
        pelicula.sinopsis = req.body.sinopsis;
        pelicula.trailer = req.body.trailer;
        pelicula.rotten_tomatoes = req.body.rotten_tomatoes;

        await pelicula.save();

        res.json(pelicula);
    } catch (error) {
        sendError500(error);
    }
}
exports.deletePelicula = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res);
        if (!pelicula) {
            return;
        }
        await pelicula.destroy();
        res.json({
            msg: 'Pelicula eliminada correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}
exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res);
        if (!pelicula) {
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha enviado el archivo'
            });
            return;
        }
        const file = req.files.fotoPerfil;
        const fileName = pelicula.id + '.jpg';
        file.mv(`public/peliculas/${fileName}`);
        await pelicula.save();
        res.json(pelicula);
    } catch (error) {
        sendError500(error);
    }
}
async function getPeliculaOr404(id, res) {
    const pelicula = await db.peliculas.findByPk(
        id,
        {
            include: "personas"
        }
    );
    if (!pelicula) {
        res.status(404).json({
            msg: 'Pelicula no encontrada'
        });
        return;
    }
    return pelicula;
}