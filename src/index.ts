import { StatusCodes } from 'http-status-codes';
import { cors } from './lib.cors';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { apiRoutes } from './api/routes';
import { apiPort } from '../../settings/setting';
import * as createError from 'http-errors';
import { HttpError } from 'http-errors';
import { apiRoutesNA } from './api/routes-na';
import { decodeToken } from './lib.decodeJWT';

export const app = express();


app.use( cors );
// 100 mb limit on body instead of default 100kb
app.use( express.json( { limit: 100 * 1024 * 1024 } ) );

app.use( apiRoutesNA )

// After this line routes are expected to be authenticated
app.use( decodeToken )
app.use( apiRoutes );

app.use( () => {
	throw createError( StatusCodes.NOT_IMPLEMENTED, 'Not implemented' );
} );

app.use( ( error: HttpError, _req: Request, res: Response, _next: NextFunction ) => {
	// this is production logging
	console.error( error );

	const code = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	const message = code === StatusCodes.INTERNAL_SERVER_ERROR ? 'Server Error' : error.message;

	res.status( code ).json( {
		code,
		data: { errors: error.errors },
		message: message,
		error: error.message || message,
	} );


} );

// start the Express server
app.listen( apiPort, () => {
	console.log( `server started at http://localhost:${ apiPort }` );
} );
