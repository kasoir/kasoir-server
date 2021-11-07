import { NextFunction, Response, Request, RequestHandler } from 'express';
import { body, param } from 'express-validator';
import { apiValidator } from '../../utils/apiValidator';
import { getDefaultMovie, Movie } from '../../../../models/movie.model';
import * as pg from '../../lib.pool';
import { apiResponder } from '../../utils/apiResponder';
import { generateDeleteQuery, generateInsertQuery, generateUpdateQuery } from '../../lib.sqlUtils';
import { getnow, getnowDate } from '../../utils/getnow';
import path = require('path');
import { getDefaultSales, Sales } from '../../../../models/sales.model';
import { UploadedFile } from 'express-fileupload';
import * as fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../../../../models/ApiResponse';

export const getByMovies: RequestHandler[] = [
	param('key').optional().isString(),
	param('value').optional(),
	apiValidator,
	apiResponder(async (req: Request, res: Response, next: NextFunction) => {
		let result: Movie[] = [];
		result = await getBy(req.params.key, req.params.value);
		return result || [];
	}),
];
export const getRecentlyMovies: RequestHandler[] = [
	param('date').isString(),
	apiValidator,
	apiResponder(async (req: Request, res: Response, next: NextFunction) => {
		let result: Movie[] = [];
		result = await getRecently(req.params.date);
		return result || [];
	}),
];
export const getMovie: RequestHandler[] = [
	param('id').isString(),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const movie: Movie[] = await getBy('id', req.params.id);
			let filepath = path.join(__dirname, '../../../movies');
			filepath += `\\${movie[0].name}.mp4`;
			const sale: Sales = {
				name: movie[0].name,
				date: getnowDate(),
				price: movie[0].price,
			}
			const query = generateInsertQuery('public."sales"', getDefaultSales(), sale, true, true);
			await pg.db.query<Movie>(query.text, query.values);
			res.sendFile(filepath);
		} catch (err) {
			console.error(err);
		}
	},
];
export const putMovie: RequestHandler[] = [
	body('id').exists().bail().isString(),
	apiValidator,
	apiResponder(async (req: Request) => {
		const payload: Movie = req.body;
		const result = await updateMovie(payload);
		return result || {};
	}),
];
export const deleteMovie: RequestHandler[] = [
	body('id').exists().bail().isString(),
	apiValidator,
	apiResponder(async (req: Request) => {
		const payload: Movie = req.body;
		const result = await removeMovie(payload);
		return result || {};
	}),
];
export const postMovie: RequestHandler[] = [
	body('id').optional().bail().isString(),
	body('name').exists().bail().isString(),
	body('category').exists().bail().isString(),
	apiValidator,
	apiResponder(async (req: Request) => {
		const payload: Movie = req.body;
		const result = await createMovie(payload);

		return result || {};
	}),
];
export const PostMovieUpload: RequestHandler[] = [
		async (req: Request, res: Response, next: NextFunction) => {
			console.log(req.files);
			if ( !req.files ) {
				res.status( StatusCodes.BAD_REQUEST ).json( { code: StatusCodes.BAD_REQUEST, data: {}, message: '', error: 'no file uploaded' } as ApiResponse<{}> );
			}
			const uploadedFiles: string[] = [];
			for (const fieldName in req.files) {
				const movie = req.files[fieldName] as UploadedFile;
				if (!fs.existsSync(`../../../ movies /`)) fs.mkdirSync('../../../movies/');
				const docPath = `../../../movies/${movie.name}`;
				console.log(docPath);
				await movie.mv(docPath);
				uploadedFiles.push(fieldName);
			}

			return uploadedFiles;
		}
]
const getBy = async (key?: string, value?: string): Promise<Movie[]> => {
	let movies: Movie[];

	if ((!key && value) || (key && !value)) throw new Error('Invalid arguments');

	let query = `SELECT * FROM public."movie"`;
	const queryValues: any[] = [];
	if (key && value && Object.keys(getDefaultMovie()).includes(key.trim())) {
		query += ` WHERE "${key.trim()}"= $1`;
		queryValues.push(value);
	}
	query += ' ;';
	movies = (await pg.db.query<Movie>(query, queryValues)).rows;
	return movies;
}
const getRecently = async (date: string): Promise<Movie[]> => {
	let movies: Movie[];
	const currentDate = getnow()
	let query = `SELECT * FROM public."movie" Where "uploadDate"<$1 And "uploadDate">$2`;
	const queryValues: any[] = [currentDate, date];
	movies = (await pg.db.query<Movie>(query, queryValues)).rows;
	return movies;
}

const updateMovie = async (movie: Movie) => {
	const query = generateUpdateQuery(`public."movie"`, getDefaultMovie(), movie, true);
	query.text += `WHERE id =$${++query.paramCounter}`;
	query.values.push(movie.id);
	const result = (await pg.db.query<Movie>(query.text, query.values)).rows[0];
	return result;
}
const removeMovie = async (movie: Movie) => {
	const query = generateDeleteQuery(`public."movie"`, { id: movie.id });
	const result = (await pg.db.query<Movie>(query.text, query.values)).rows[0];
	return result;
}
const createMovie = async (movie: Movie) => {
	const query = generateInsertQuery(`public."movie"`, getDefaultMovie(), movie, true, true);
	const result = (await pg.db.query<Movie>(query.text, query.values)).rows[0];
	return result;
}