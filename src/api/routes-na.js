"use strict";
exports.__esModule = true;
exports.apiRoutesNA = void 0;
var express_1 = require("express");
var route_auth_1 = require("./auth/route.auth");
var route_user_1 = require("./user/route.user");
var route_movie_1 = require("./movie/route.movie");
var route_actor_1 = require("./actor/route.actor");
var route_director_1 = require("./director/route.director");
var route_report_1 = require("./report/route.report");
exports.apiRoutesNA = express_1.Router();
exports.apiRoutesNA.use(route_user_1.userRoutes);
exports.apiRoutesNA.use(route_actor_1.actorRoutes);
exports.apiRoutesNA.use(route_movie_1.movieRoutes);
exports.apiRoutesNA.use(route_director_1.directorRoutes);
exports.apiRoutesNA.use(route_report_1.reportRoutes);
exports.apiRoutesNA.use(route_auth_1.authRoutes);
