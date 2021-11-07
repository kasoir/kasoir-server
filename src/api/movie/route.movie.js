"use strict";
exports.__esModule = true;
exports.movieRoutes = void 0;
var express_1 = require("express");
var functions_movie_1 = require("./functions.movie");
exports.movieRoutes = express_1.Router();
exports.movieRoutes.route('/movieUpload/upload').post(functions_movie_1.PostMovieUpload);
exports.movieRoutes.route('/movie/getMovie/:id').get(functions_movie_1.getMovie);
exports.movieRoutes.route('/movie/:date').get(functions_movie_1.getRecentlyMovies);
exports.movieRoutes.route('/movie/:key?/:value?').get(functions_movie_1.getByMovies);
exports.movieRoutes.route('/movie/updateMovie').put(functions_movie_1.putMovie);
exports.movieRoutes.route('/movie/createMovie').post(functions_movie_1.postMovie);
