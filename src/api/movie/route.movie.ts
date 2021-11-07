import { Router } from "express";
import { getByMovies, getMovie, getRecentlyMovies, postMovie, PostMovieUpload, putMovie } from './functions.movie';

export const movieRoutes: Router = Router();

movieRoutes.route( '/movieUpload/upload' ).post( PostMovieUpload );
movieRoutes.route( '/movie/getMovie/:id' ).get( getMovie );
movieRoutes.route( '/movie/:date' ).get( getRecentlyMovies );
movieRoutes.route( '/movie/:key?/:value?' ).get( getByMovies );
movieRoutes.route( '/movie/updateMovie' ).put( putMovie );
movieRoutes.route( '/movie/createMovie' ).post( postMovie );