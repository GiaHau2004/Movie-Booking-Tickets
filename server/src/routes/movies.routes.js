const app = require('../app');
const MoviesController = require('../controllers/movies.controller');
const router = require('express').Router();

module.exports = app => {
    router.get("/get-movies-list", MoviesController.getMovieList);
    router.get("/search-movies", MoviesController.searchMovies);
    router.get("/get-movie-details", MoviesController.getMovieDetails);
    router.get("/get-screenings-schedule", MoviesController.getScreeningsSchedule);
    app.use('/api/movies', router);
}