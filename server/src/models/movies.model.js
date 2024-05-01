const sql = require('./db.model');

class MoviesModels {
    constructor(movie) {
        this.movie_id = movie.movie_id;
        this.title = movie.title;
        this.director = movie.director;
        this.release_date = movie.release_date;
        this.duration = movie.duration;
        this.genre = movie.genre;
    }

    static async getMoviesList(result) {
        sql.query(`SELECT * FROM Movies`, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        })
    }

    static serchMovies(keyword, result) {
        sql.query(`SELECT * FROM Movies WHERE title LIKE '%${keyword}%';`, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        })
    }

    static getMovieDetails(movie_id, result) {
        sql.query(`SELECT * FROM Movies WHERE movie_id = '${movie_id}';`, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        })
    }

    static getScreeningsSchedule(movie_id, result) {
        sql.query(`SELECT Theaters.theater_id, Theaters.name, Movies.title, Screenings.start_time, Screenings.end_time FROM Screenings INNER JOIN Movies ON Screenings.movie_id = Movies.movie_id INNER JOIN Theaters ON Screenings.theater_id = Theaters.theater_id WHERE Screenings.movie_id = '1';`, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        })
    }
}

module.exports = MoviesModels;