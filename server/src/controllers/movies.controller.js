const MoviesModels = require('../models/movies.model');

class MoviesController {
    static getMovieList(req, res) {
        MoviesModels.getMoviesList((err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "An error occurred while retrieving the movie list."
                });
            } else {
                res.send(data);
            }
        });
    }
    static searchMovies(req, res) {
        const keyword = req.body.keyword;
        MoviesModels.serchMovies(keyword, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "An error occurred while retrieving the movie list."
                });
            } else {
                res.send(data);
            }
        })
    }

    static getMovieDetails(req, res) {
        const movie_id = req.body.movie_id;
        MoviesModels.getMovieDetails(movie_id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "An error occurred while retrieving the movie list."
                });
            } else {
                res.send(data);
            }
        })
    }

    static getScreeningsSchedule(req, res) {
        const movie_id = req.body.movie_id;
        MoviesModels.getScreeningsSchedule(movie_id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "An error occurred while retrieving the movie list."
                });
            } else {
                res.send(data);
            }
        })
    }
}

module.exports = MoviesController;