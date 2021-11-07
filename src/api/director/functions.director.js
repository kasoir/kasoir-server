"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.putDirector = exports.postDirector = exports.getByDirector = void 0;
var express_validator_1 = require("express-validator");
var director_model_1 = require("../../../models/director.model");
var apiResponder_1 = require("../../utils/apiResponder");
var apiValidator_1 = require("../../utils/apiValidator");
var pg = require("../../lib.pool");
var lib_sqlUtils_1 = require("../../lib.sqlUtils");
exports.getByDirector = [
    express_validator_1.param('key').optional().isString(),
    express_validator_1.param('value').optional(),
    apiValidator_1.apiValidator,
    apiResponder_1.apiResponder(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = [];
                    return [4 /*yield*/, getBy(req.params.key, req.params.value)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result || []];
            }
        });
    }); }),
];
exports.postDirector = [
    express_validator_1.body('id').optional().isString(),
    express_validator_1.body('name').exists().isString(),
    express_validator_1.body('nationality').exists().isString(),
    apiValidator_1.apiValidator,
    apiResponder_1.apiResponder(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = req.body;
                    return [4 /*yield*/, createDirector(payload)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result || []];
            }
        });
    }); }),
];
exports.putDirector = [
    express_validator_1.body('id').optional().isString(),
    express_validator_1.body('name').exists().isString(),
    express_validator_1.body('nationality').exists().isString(),
    apiValidator_1.apiValidator,
    apiResponder_1.apiResponder(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = req.body;
                    return [4 /*yield*/, updateDirector(payload)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result || []];
            }
        });
    }); }),
];
var getBy = function (key, value) { return __awaiter(void 0, void 0, void 0, function () {
    var directors, query, queryValues;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!key && value) || (key && !value))
                    throw new Error('Invalid arguments');
                query = "SELECT * FROM public.\"director\"";
                queryValues = [];
                if (key && value && Object.keys(director_model_1.getDefaultDirector()).includes(key.trim())) {
                    query += " WHERE \"" + key.trim() + "\"= $1";
                    queryValues.push(value);
                }
                query += ' ;';
                return [4 /*yield*/, pg.db.query(query, queryValues)];
            case 1:
                directors = (_a.sent()).rows;
                return [2 /*return*/, directors];
        }
    });
}); };
var createDirector = function (director) { return __awaiter(void 0, void 0, void 0, function () {
    var query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = lib_sqlUtils_1.generateInsertQuery("public.\"director\"", director_model_1.getDefaultDirector(), director, true, true);
                return [4 /*yield*/, pg.db.query(query.text, query.values)];
            case 1:
                result = (_a.sent()).rows[0];
                return [2 /*return*/, result];
        }
    });
}); };
var updateDirector = function (director) { return __awaiter(void 0, void 0, void 0, function () {
    var query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = lib_sqlUtils_1.generateUpdateQuery("public.\"director\"", director_model_1.getDefaultDirector(), director, true);
                query.text += " WHERE id = $" + ++query.paramCounter;
                query.values.push(director.id);
                return [4 /*yield*/, pg.db.query(query.text, query.values)];
            case 1:
                result = (_a.sent()).rows[0];
                return [2 /*return*/, result];
        }
    });
}); };
