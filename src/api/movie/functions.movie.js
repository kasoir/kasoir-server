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
exports.PostMovieUpload = exports.postMovie = exports.deleteMovie = exports.putMovie = exports.getMovie = exports.getRecentlyMovies = exports.getByMovies = void 0;
var express_validator_1 = require("express-validator");
var apiValidator_1 = require("../../utils/apiValidator");
var movie_model_1 = require("../../../models/movie.model");
var pg = require("../../lib.pool");
var apiResponder_1 = require("../../utils/apiResponder");
var lib_sqlUtils_1 = require("../../lib.sqlUtils");
var getnow_1 = require("../../utils/getnow");
var path = require("path");
var sales_model_1 = require("../../../models/sales.model");
var fs = require("fs");
var http_status_codes_1 = require("http-status-codes");
exports.getByMovies = [
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
exports.getRecentlyMovies = [
    express_validator_1.param('date').isString(),
    apiValidator_1.apiValidator,
    apiResponder_1.apiResponder(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = [];
                    return [4 /*yield*/, getRecently(req.params.date)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result || []];
            }
        });
    }); }),
];
exports.getMovie = [
    express_validator_1.param('id').isString(),
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var movie, filepath, sale, query, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getBy('id', req.params.id)];
                case 1:
                    movie = _a.sent();
                    filepath = path.join(__dirname, '../../../movies');
                    filepath += "\\" + movie[0].name + ".mp4";
                    sale = {
                        name: movie[0].name,
                        date: getnow_1.getnowDate(),
                        price: movie[0].price
                    };
                    query = lib_sqlUtils_1.generateInsertQuery('public."sales"', sales_model_1.getDefaultSales(), sale, true, true);
                    return [4 /*yield*/, pg.db.query(query.text, query.values)];
                case 2:
                    _a.sent();
                    res.sendFile(filepath);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
];
exports.putMovie = [
    express_validator_1.body('id').exists().bail().isString(),
    apiValidator_1.apiValidator,
    apiResponder_1.apiResponder(function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = req.body;
                    return [4 /*yield*/, updateMovie(payload)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result || {}];
            }
        });
    }); }),
];
exports.deleteMovie = [
    express_validator_1.body('id').exists().bail().isString(),
    apiValidator_1.apiValidator,
    apiResponder_1.apiResponder(function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = req.body;
                    return [4 /*yield*/, removeMovie(payload)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result || {}];
            }
        });
    }); }),
];
exports.postMovie = [
    express_validator_1.body('id').optional().bail().isString(),
    express_validator_1.body('name').exists().bail().isString(),
    express_validator_1.body('category').exists().bail().isString(),
    apiValidator_1.apiValidator,
    apiResponder_1.apiResponder(function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = req.body;
                    return [4 /*yield*/, createMovie(payload)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result || {}];
            }
        });
    }); }),
];
exports.PostMovieUpload = [
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var uploadedFiles, _a, _b, _i, fieldName, movie, docPath;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log(req.files);
                    if (!req.files) {
                        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ code: http_status_codes_1.StatusCodes.BAD_REQUEST, data: {}, message: '', error: 'no file uploaded' });
                    }
                    uploadedFiles = [];
                    _a = [];
                    for (_b in req.files)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    fieldName = _a[_i];
                    movie = req.files[fieldName];
                    if (!fs.existsSync("../../../ movies /"))
                        fs.mkdirSync('../../../movies/');
                    docPath = "../../../movies/" + movie.name;
                    console.log(docPath);
                    return [4 /*yield*/, movie.mv(docPath)];
                case 2:
                    _c.sent();
                    uploadedFiles.push(fieldName);
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, uploadedFiles];
            }
        });
    }); }
];
var getBy = function (key, value) { return __awaiter(void 0, void 0, void 0, function () {
    var movies, query, queryValues;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ((!key && value) || (key && !value))
                    throw new Error('Invalid arguments');
                query = "SELECT * FROM public.\"movie\"";
                queryValues = [];
                if (key && value && Object.keys(movie_model_1.getDefaultMovie()).includes(key.trim())) {
                    query += " WHERE \"" + key.trim() + "\"= $1";
                    queryValues.push(value);
                }
                query += ' ;';
                return [4 /*yield*/, pg.db.query(query, queryValues)];
            case 1:
                movies = (_a.sent()).rows;
                return [2 /*return*/, movies];
        }
    });
}); };
var getRecently = function (date) { return __awaiter(void 0, void 0, void 0, function () {
    var movies, currentDate, query, queryValues;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentDate = getnow_1.getnow();
                query = "SELECT * FROM public.\"movie\" Where \"uploadDate\"<$1 And \"uploadDate\">$2";
                queryValues = [currentDate, date];
                return [4 /*yield*/, pg.db.query(query, queryValues)];
            case 1:
                movies = (_a.sent()).rows;
                return [2 /*return*/, movies];
        }
    });
}); };
var updateMovie = function (movie) { return __awaiter(void 0, void 0, void 0, function () {
    var query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = lib_sqlUtils_1.generateUpdateQuery("public.\"movie\"", movie_model_1.getDefaultMovie(), movie, true);
                query.text += "WHERE id =$" + ++query.paramCounter;
                query.values.push(movie.id);
                return [4 /*yield*/, pg.db.query(query.text, query.values)];
            case 1:
                result = (_a.sent()).rows[0];
                return [2 /*return*/, result];
        }
    });
}); };
var removeMovie = function (movie) { return __awaiter(void 0, void 0, void 0, function () {
    var query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = lib_sqlUtils_1.generateDeleteQuery("public.\"movie\"", { id: movie.id });
                return [4 /*yield*/, pg.db.query(query.text, query.values)];
            case 1:
                result = (_a.sent()).rows[0];
                return [2 /*return*/, result];
        }
    });
}); };
var createMovie = function (movie) { return __awaiter(void 0, void 0, void 0, function () {
    var query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = lib_sqlUtils_1.generateInsertQuery("public.\"movie\"", movie_model_1.getDefaultMovie(), movie, true, true);
                return [4 /*yield*/, pg.db.query(query.text, query.values)];
            case 1:
                result = (_a.sent()).rows[0];
                return [2 /*return*/, result];
        }
    });
}); };
