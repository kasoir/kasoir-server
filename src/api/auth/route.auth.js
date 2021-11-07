"use strict";
exports.__esModule = true;
exports.authRoutes = void 0;
var express_1 = require("express");
var functions_auth_1 = require("./functions.auth");
exports.authRoutes = express_1.Router();
exports.authRoutes.route('/auth').post(functions_auth_1.jwtAuthPost);
