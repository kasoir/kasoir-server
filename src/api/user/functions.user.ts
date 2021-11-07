import { NextFunction, Response, Request, RequestHandler } from 'express';
import { body, param } from 'express-validator';
import { apiValidator } from '../../utils/apiValidator';
import * as pg from '../../lib.pool';
import { apiResponder } from '../../utils/apiResponder';
import { getDefaultUser, User } from '../../../../models/user.model';
import { generateInsertQuery } from '../../lib.sqlUtils';
import * as bcrypt from 'bcrypt';


export const getByUser: RequestHandler[] = [
    param('key').optional().isString(),
    param('value').optional(),
    apiValidator,
    apiResponder(async (req: Request, res: Response, next: NextFunction) => {
        let result: User[] = [];
        result = await getBy(req.params.key, req.params.value);
        return result || [];
    }),
];

export const postUser: RequestHandler[] = [
    body('id').optional().bail().isString(),
    body('name').exists().bail().isString(),
    body('email').exists().bail().isString(),
    body('password').exists().bail().isString(),
    apiValidator,
    apiResponder(async (req: Request) => {
        const payload: User = req.body;
        const user = await getBy('email', payload.email);
        if (user.length === 0) {
            const result = await createUser(payload);
            return result || {};
        } else {
            throw { message: 'User already exist' };

        }
    }),
];

const getBy = async (key?: string, value?: string): Promise<User[]> => {
    let users: User[];

    if ((!key && value) || (key && !value)) throw new Error('Invalid arguments');

    let query = `SELECT * FROM public."user"`;
    const queryValues: any[] = [];
    if (key && value && Object.keys(getDefaultUser()).includes(key.trim())) {
        query += ` WHERE "${key.trim()}"= $1`;
        queryValues.push(value);
    }
    query += ' ;';
    users = (await pg.db.query<User>(query, queryValues)).rows;
    return users;
}

const createUser = async (user: User) => {
    const password = await bcrypt.hash( user.password ? user.password : user.email, 10 );
    user.password = password;
    const query = generateInsertQuery(`public."user"`, getDefaultUser(), user, true, true);
    const result = (await pg.db.query<User>(query.text, query.values)).rows[0];
    return result;
}