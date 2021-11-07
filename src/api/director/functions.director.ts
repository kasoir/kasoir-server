import { Request, Response, RequestHandler, NextFunction } from "express";
import { body, param } from "express-validator";
import { Director, getDefaultDirector } from "../../../../models/director.model";
import { apiResponder } from "../../utils/apiResponder";
import { apiValidator } from "../../utils/apiValidator";
import * as pg from '../../lib.pool';
import { generateInsertQuery, generateUpdateQuery } from "../../lib.sqlUtils";


export const getByDirector: RequestHandler[] = [
    param('key').optional().isString(),
    param('value').optional(),
    apiValidator,
    apiResponder(async (req: Request, res: Response, next: NextFunction) => {
        let result: Director[] = [];
        result = await getBy(req.params.key, req.params.value);
        return result || [];
    }),
];
export const postDirector: RequestHandler[] = [
    body('id').optional().isString(),
    body('name').exists().isString(),
    body('nationality').exists().isString(),
    apiValidator,
    apiResponder(async (req: Request, res: Response, next: NextFunction) => {
        const payload: Director = req.body;
        const result = await createDirector(payload);
        return result || [];
    }),
];
export const putDirector: RequestHandler[] = [
    body('id').optional().isString(),
    body('name').exists().isString(),
    body('nationality').exists().isString(),
    apiValidator,
    apiResponder(async (req: Request, res: Response, next: NextFunction) => {
        const payload: Director = req.body;
        const result = await updateDirector(payload);
        return result || [];
    }),
];

const getBy = async (key?: string, value?: string): Promise<Director[]> => {
    let directors: Director[];

    if ((!key && value) || (key && !value)) throw new Error('Invalid arguments');

    let query = `SELECT * FROM public."director"`;
    const queryValues: any[] = [];
    if (key && value && Object.keys(getDefaultDirector()).includes(key.trim())) {
        query += ` WHERE "${key.trim()}"= $1`;
        queryValues.push(value);
    }
    query += ' ;';
    directors = (await pg.db.query<Director>(query, queryValues)).rows;
    return directors;
}

const createDirector = async (director: Director) => {
    const query = generateInsertQuery(`public."director"`, getDefaultDirector(), director, true, true);
    const result = (await pg.db.query<Director>(query.text, query.values)).rows[0];
    return result;
}
const updateDirector = async (director: Director) => {
    const query = generateUpdateQuery(`public."director"`, getDefaultDirector(), director, true);
    query.text += ` WHERE id = $${++query.paramCounter}`;
    query.values.push(director.id);
    const result = (await pg.db.query<Director>(query.text, query.values)).rows[0];
    return result;
}