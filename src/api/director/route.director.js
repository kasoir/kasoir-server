"use strict";
exports.__esModule = true;
exports.directorRoutes = void 0;
var express_1 = require("express");
var functions_director_1 = require("./functions.director");
exports.directorRoutes = express_1.Router();
exports.directorRoutes.route('/director/:key?/:value?').get(functions_director_1.getByDirector);
exports.directorRoutes.route('/director/createDirector').post(functions_director_1.postDirector);
exports.directorRoutes.route('/director/updateDirector').put(functions_director_1.putDirector);
