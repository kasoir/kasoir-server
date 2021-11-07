import { NextFunction, RequestHandler, Request, Response } from "express";
import { body, param } from "express-validator";
import { Category, getDefaultCategory } from "../../../../models/category.model";
import * as pg from '../../lib.pool';
import { generateInsertQuery, generateUpdateQuery } from "../../lib.sqlUtils";
import { apiResponder } from "../../utils/apiResponder";
import { apiValidator } from "../../utils/apiValidator";

export const getByCategory: RequestHandler[] = [
	param('key').optional().isString(),
	param('value').optional(),
	apiValidator,
	apiResponder(async (req: Request, res: Response, next: NextFunction) => {
		let result: Category[] = [];
		result = await getBy(req.params.key, req.params.value);
		return result || [];
	}),
];

export const postCategory: RequestHandler[] = [
    body('id').optional().isString(),
    body('description').exists().isString(),
    apiValidator,
    apiResponder(async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;
        const result = await createCategory(payload);
        return result || [];
    }),
];

export const putCategory: RequestHandler[] = [
    body('id').optional().isString(),
    body('description').exists().isString(),
    apiValidator,
    apiResponder(async (req: Request, res: Response, next: NextFunction) => {
        const payload: Category = req.body;
        const result = await updateCategory(payload);
        return result || [];
    }),
];

const getBy = async (key?: string, value?: string): Promise<Category[]> => {
	let category: Category[];

	if ((!key && value) || (key && !value)) throw new Error('Invalid arguments');

	let query = `SELECT * FROM public."category"`;
	const queryValues: any[] = [];
	if (key && value && Object.keys(getDefaultCategory()).includes(key.trim())) {
		query += ` WHERE "${key.trim()}"= $1`;
		queryValues.push(value);
	}
	query += ' ;';
	category = (await pg.db.query<Category>(query, queryValues)).rows;
	return category;
}

const createCategory = async (category: Category) => {
    const query = generateInsertQuery(`public."category"`, getDefaultCategory(), category, true, false);
    const result = (await pg.db.query<Category>(query.text, query.values)).rows[0];
    return result;
}

const updateCategory = async (category: Category) => {
    const query = generateUpdateQuery(`public."category"`, getDefaultCategory(), category, false);
    query.text += ` WHERE id = $${++query.paramCounter}`;
    query.values.push(category.id);
    const result = (await pg.db.query<Category>(query.text, query.values)).rows[0];
    return result;
}