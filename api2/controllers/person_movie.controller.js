const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");


// exports.listPersona = async (req, res) => {
//     try {
//         const personas = await db.personas.findAll();
//         res.json(personas);
//     } catch (error) {
//         sendError500(error);
//     }
// }

// add to table person_movie
exports.addPersonMovie = async (req, res) => {
    console.log('req.body FROM API', req.body);
    try {
        const director_movie = {
            person_id: req.body.person_id,
            movie_id: req.body.movie_id,
            role: 'Director'
        }
        const person_movieCreada = await db.person_movie.create(director_movie);

        for (let i = 0; i < req.body.actors.length; i++) {
            const actor_movie = {
                person_id: req.body.actors[i],
                movie_id: req.body.movie_id,
                role: 'Actor'
            }
            const person_movieCreada = await db.person_movie.create(actor_movie);
        }

        res.status(201).json(person_movieCreada);
    } catch (error) {
        sendError500(error);
    }
}

exports.deleteMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const person_movie = await db.person_movie.destroy({
            where: {
                movie_id: id
            }
        });
        res.json(person_movie);
    } catch (error) {
        sendError500(error);
    }
}