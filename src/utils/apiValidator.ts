import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import * as createError from 'http-errors';

// Now the apiValidator also obeys the global error handling and it is much simpler too like the API endpoint functions
// Please note _res is defined as _res instead of res for a reason
// we are actually not using _res and typescript gives a warning for it saying 
// 'res' is declared but its value is never read.
// In order to get rid of this error message, we are prefixing this variable with an underscore.
export const apiValidator = ( req: Request, _res: Response, next: NextFunction ) => {
	const errors = validationResult( req );
	if ( errors.isEmpty() ) {
		next();
	} else {
		throw createError( StatusCodes.BAD_REQUEST, 'Bad Request', { errors: errors.array() } );
	}
}