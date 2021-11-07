"use strict";
exports.__esModule = true;
exports.reportRoutes = void 0;
var express_1 = require("express");
var functions_report_1 = require("./functions.report");
exports.reportRoutes = express_1.Router();
exports.reportRoutes.route('/report/generateReport').post(functions_report_1.getReport);
