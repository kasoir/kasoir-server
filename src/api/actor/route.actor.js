"use strict";
exports.__esModule = true;
exports.actorRoutes = void 0;
var express_1 = require("express");
var functions_actor_1 = require("./functions.actor");
exports.actorRoutes = express_1.Router();
exports.actorRoutes.route('/actor/:key?/:value?').get(functions_actor_1.getByActor);
exports.actorRoutes.route('/actor/updatActor').put(functions_actor_1.putActor);
exports.actorRoutes.route('/actor/createActor').post(functions_actor_1.postActor);
