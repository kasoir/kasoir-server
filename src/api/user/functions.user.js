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
exports.postUser = exports.getByUser = void 0;
var express_validator_1 = require("express-validator");
var apiValidator_1 = require("../../utils/apiValidator");
var pg = require("../../lib.pool");
var apiResponder_1 = require("../../utils/apiResponder");
var user_model_1 = require("../../../models/user.model");
var lib_sqlUtils_1 = require("../../lib.sqlUtils");
var bcrypt = require("bcrypt");
exports.getByUser = [
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
exports.postUser = [
    express_validator_1.body('id').optional().bail().isString(),
    express_validator_1.body('name').exists().bail().isString(),
    express_validator_1.body('email').exists().bail().isString(),
    express_validator_1.body('password').exists().bail().isString(),
    apiValidator_1.apiValidator,
    apiResponder_1.apiResponder(function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = req.body;
                    return [4 /*yield*/, getBy('email', payload.email)];
                case 1:
                    user = _a.sent();
                    if (!(user.length === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, createUser(payload)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result || {}];
                case 3: throw { message: 'User already exist' };
            }
        });
    }); }),
];
var getBy = function (key, value) { return __awaiter(void 0, void 0, void 0, function () {
    var users, query, queryValues;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!key && value) || (key && !value))
                    throw new Error('Invalid arguments');
                query = "SELECT * FROM public.\"user\"";
                queryValues = [];
                if (key && value && Object.keys(user_model_1.getDefaultUser()).includes(key.trim())) {
                    query += " WHERE \"" + key.trim() + "\"= $1";
                    queryValues.push(value);
                }
                query += ' ;';
                return [4 /*yield*/, pg.db.query(query, queryValues)];
            case 1:
                users = (_a.sent()).rows;
                return [2 /*return*/, users];
        }
    });
}); };
var createUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var password, query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt.hash(user.password ? user.password : user.email, 10)];
            case 1:
                password = _a.sent();
                user.password = password;
                query = lib_sqlUtils_1.generateInsertQuery("public.\"user\"", user_model_1.getDefaultUser(), user, true, true);
                return [4 /*yield*/, pg.db.query(query.text, query.values)];
            case 2:
                result = (_a.sent()).rows[0];
                return [2 /*return*/, result];
        }
    });
}); };
