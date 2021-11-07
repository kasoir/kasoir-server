"use strict";
exports.__esModule = true;
exports.categoryRoutes = void 0;
var express_1 = require("express");
var functions_category_1 = require("./functions.category");
exports.categoryRoutes = express_1.Router();
exports.categoryRoutes.route('/category/:key?/:value?').get(functions_category_1.getByCategory);
exports.categoryRoutes.route('/category/createCategory').post(functions_category_1.postCategory);
