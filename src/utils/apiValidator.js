"use strict";
exports.__esModule = true;
exports.apiValidator = void 0;
var express_validator_1 = require("express-validator");
var http_status_codes_1 = require("http-status-codes");
var createError = require("http-errors");
// Now the apiValidator also obeys the global error handling and it is much simpler too like the API endpoint functions
// Please note _res is defined as _res instead of res for a reason
// we are actually not using _res and typescript gives a warning for it saying 
// 'res' is declared but its value is never read.
// In order to get rid of this error message, we are prefixing this variable with an underscore.
var apiValidator = function (req, _res, next) {
    var errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        next();
    }
    else {
        throw createError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Bad Request', { errors: errors.array() });
    }
};
exports.apiValidator = apiValidator;
