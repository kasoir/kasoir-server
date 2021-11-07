import { NextFunction, Response, Request, RequestHandler } from 'express';
import { param, body } from "express-validator";
import { Actor, getDefaultActor } from "../../../../models/actor.model";
import { generateDeleteQuery, generateInsertQuery, generateUpdateQuery } from "../../lib.sqlUtils";
import { apiResponder } from "../../utils/apiResponder";
import { apiValidator } from "../../utils/apiValidator";
import * as pg from '../../lib.pool';

export const getByActor: RequestHandler[] = [
	param('key').optional().isString(),
	param('value').optional(),
	apiValidator,
	apiResponder(async (req: Request, res: Response, next: NextFunction) => {
		let result: Actor[] = [];
		result = await getBy(req.params.key, req.params.value);
		return result || [];
	}),
]
export const putActor: RequestHandler[] = [
	body('id').exists().bail().isString(),
	apiValidator,
	apiResponder(async (req: Request, res: Response, next: NextFunction) => {
		const payload: Actor = req.body;
		const result = await updateActor(payload);
		return result || {};
	}),
];
export const deleteActor: RequestHandler[] = [
	body('id').exists().bail().isString(),
	apiValidator,
	apiResponder(async (req: Request, res: Response, next: NextFunction) => {
		const payload: Actor = req.body;
		const result = await removeActor(payload);
		return result || {};
	}),
];
export const postActor: RequestHandler[] = [
	body('id').optional().bail().isString(),
	body('name').exists().bail().isString(),
	apiValidator,
	apiResponder(async (req: Request, res: Response, next: NextFunction) => {
		const payload: Actor = req.body;
		console.log(req.body);
        console.log(getDefaultActor());
		const result = await createActor(payload);

		return result || {};
	}),
];

const getBy = async (key?: string, value?: string): Promise<Actor[]> => {
	let movies: Actor[];

	if ((!key && value) || (key && !value)) throw new Error('Invalid arguments');

	let query = `SELECT * FROM public."actor"`;
	const queryValues: any[] = [];
	if (key && value && Object.keys(getDefaultActor()).includes(key.trim())) {
		query += ` WHERE "${key.trim()}"= $1`;
		queryValues.push(value);
	}
	query += ' ;';
	movies = (await pg.db.query<Actor>(query, queryValues)).rows;
	return movies;
}

const updateActor = async (actor: Actor) => {
	const query = generateUpdateQuery(`public."actor"`, getDefaultActor(), actor, true);
	query.text += `WHERE id =$${++query.paramCounter}`;
	query.values.push(actor.id);
	const result = (await pg.db.query<Actor>(query.text, query.values)).rows[0];
	return result;
}
const removeActor = async (actor: Actor) => {
	const query = generateDeleteQuery(`public."actor"`, { id: actor.id });
	const result = (await pg.db.query<Actor>(query.text, query.values)).rows[0];
	return result;
}
const createActor = async (actor: Actor) => {
	const query = generateInsertQuery(`public."actor"`, getDefaultActor(), actor, true, true);
	const result = (await pg.db.query<Actor>(query.text, query.values)).rows[0];
	return result;
}