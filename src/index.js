"use strict";
exports.__esModule = true;
exports.app = void 0;
var http_status_codes_1 = require("http-status-codes");
var lib_cors_1 = require("./lib.cors");
var express = require("express");
var routes_1 = require("./api/routes");
var setting_1 = require("../settings/setting");
var createError = require("http-errors");
var routes_na_1 = require("./api/routes-na");
var lib_decodeJWT_1 = require("./lib.decodeJWT");
exports.app = express();
exports.app.use(lib_cors_1.cors);
// 100 mb limit on body instead of default 100kb
exports.app.use(express.json({ limit: 100 * 1024 * 1024 }));
exports.app.use(routes_na_1.apiRoutesNA);
// After this line routes are expected to be authenticated
exports.app.use(lib_decodeJWT_1.decodeToken);
exports.app.use(routes_1.apiRoutes);
exports.app.use(function () {
    throw createError(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
});
exports.app.use(function (error, _req, res, _next) {
    // this is production logging
    console.error(error);
    var code = error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    var message = code === http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR ? 'Server Error' : error.message;
    res.status(code).json({
        code: code,
        data: { errors: error.errors },
        message: message,
        error: error.message || message
    });
});
// start the Express server
exports.app.listen(setting_1.apiPort, function () {
    console.log("server started at http://localhost:" + setting_1.apiPort);
});
