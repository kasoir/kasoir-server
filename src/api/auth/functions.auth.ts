import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body } from 'express-validator';
import { StatusCodes as HttpStatus } from 'http-status-codes';
import { ApiResponse } from '../../../models/ApiResponse';
import { Jwt } from '../../../models/jwt.model';
import * as bcrypt from 'bcrypt';
import * as pg from '../../lib.pool';
import { generateAuthToken } from '../../lib.auth'
import createHttpError = require('http-errors');
import { settings } from '../../../settings/setting';

const signInUser = async (googleUser: boolean, email: string, password?: string) => {
	const query = ` SELECT u.* from public."user" u where lower(u."email") = lower ($1)`;
	const pgUser = (await pg.db.query(query, [email])).rows;
	if (pgUser.length <= 0) throw new createHttpError.NotFound('user not found!');
	else if (pgUser.length > 1) throw new createHttpError.Conflict('duplicate users found in pg');
	else if (!!password && !bcrypt.compareSync(password, pgUser[0].password)) throw new createHttpError.NotFound('user name/password error!');
	return pgUser[0];
}

export const jwtAuthPost: RequestHandler[] = [
	body('email').isString().bail().exists(),
	body('password').isString().bail().exists(),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = req.body;
			const user = await signInUser(false, payload.email, payload.password);
			user.password = "";
			if (user.isRejected) {
				throw new createHttpError.Unauthorized('User is Rejected Please Contact System Administrator.');
			}
			const jwt: Jwt = {
				uid: user.id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin || false,
				isVerified: user.isVerified || false,
				tokenLife: +settings.jwtTokenLifeTime,
				actorType: 'user'
			}
			const jwtToken = generateAuthToken(jwt);
			res.status(HttpStatus.OK).json({
				code: HttpStatus.OK, token: jwtToken, message: 'success'
			});
		} catch (err) {
			console.error(err);
			res.status(err.status).json({ code: err.status, data: {}, message: '', error: err.message || 'error' } as ApiResponse<{}>);

		}
	}
]

const checkVerifiedUser = async (email: string, password?: string) => {
	const pgUser = (await
		pg.db.query(` SELECT u.* from public."user" u where lower(u."email") = lower ($1)`, [email])).rows;
	if (pgUser.length <= 0) throw new createHttpError.NotFound('user not found!');
	else if (pgUser.length > 1) throw new createHttpError.Conflict('duplicate users found in pg');
	if (!!password && !bcrypt.compareSync(password, pgUser[0].password)) throw new createHttpError.NotFound('user name/passowrd error!');
	return pgUser[0];
}

export const checkVerified: RequestHandler[] = [
	body('email').isString().bail().exists(),
	body('password').isString().bail().exists(),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = req.body;
			const user = await checkVerifiedUser(payload.email, payload.password);
			user.password = "";
			const jwt: Jwt = {
				uid: user.id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin || false,
				isVerified: user.isVerified || false,
				tokenLife: +settings.jwtTokenLifeTime,
				actorType: 'user'
			}
			const jwtToken = generateAuthToken(jwt);

			res.status(HttpStatus.OK).json({
				code: HttpStatus.OK, data: { token: jwtToken }, message: 'success'
			});
		}
		catch (err) {
			res.status(err.status).json({ code: err.status, data: {}, message: '', error: err.message || 'error' } as ApiResponse<{}>);

		}
	}
]
