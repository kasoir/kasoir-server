"use strict";
exports.__esModule = true;
exports.apiRoutes = void 0;
var express_1 = require("express");
var route_category_1 = require("./category/route.category");
exports.apiRoutes = express_1.Router();
exports.apiRoutes.use(route_category_1.categoryRoutes);
