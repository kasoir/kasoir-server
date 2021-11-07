"use strict";
exports.__esModule = true;
exports.userRoutes = void 0;
var express_1 = require("express");
var functions_user_1 = require("./functions.user");
exports.userRoutes = express_1.Router();
exports.userRoutes.route('/user/:key?/:value?').get(functions_user_1.getByUser);
exports.userRoutes.route('/user/').post(functions_user_1.postUser);
