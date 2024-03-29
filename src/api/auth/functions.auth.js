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
exports.checkVerified = exports.jwtAuthPost = void 0;
var express_validator_1 = require("express-validator");
var http_status_codes_1 = require("http-status-codes");
var bcrypt = require("bcrypt");
var pg = require("../../lib.pool");
var lib_auth_1 = require("../../lib.auth");
var createHttpError = require("http-errors");
var setting_1 = require("../../../settings/setting");
var signInUser = function (googleUser, email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var query, pgUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = " SELECT u.* from public.\"user\" u where lower(u.\"email\") = lower ($1)";
                return [4 /*yield*/, pg.db.query(query, [email])];
            case 1:
                pgUser = (_a.sent()).rows;
                if (pgUser.length <= 0)
                    throw new createHttpError.NotFound('user not found!');
                else if (pgUser.length > 1)
                    throw new createHttpError.Conflict('duplicate users found in pg');
                else if (!!password && !bcrypt.compareSync(password, pgUser[0].password))
                    throw new createHttpError.NotFound('user name/password error!');
                return [2 /*return*/, pgUser[0]];
        }
    });
}); };
exports.jwtAuthPost = [
    express_validator_1.body('email').isString().bail().exists(),
    express_validator_1.body('password').isString().bail().exists(),
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, user, jwt, jwtToken, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    payload = req.body;
                    return [4 /*yield*/, signInUser(false, payload.email, payload.password)];
                case 1:
                    user = _a.sent();
                    user.password = "";
                    if (user.isRejected) {
                        throw new createHttpError.Unauthorized('User is Rejected Please Contact System Administrator.');
                    }
                    jwt = {
                        uid: user.id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin || false,
                        isVerified: user.isVerified || false,
                        tokenLife: +setting_1.settings.jwtTokenLifeTime,
                        actorType: 'user'
                    };
                    jwtToken = lib_auth_1.generateAuthToken(jwt);
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        code: http_status_codes_1.StatusCodes.OK, token: jwtToken, message: 'success'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    res.status(err_1.status).json({ code: err_1.status, data: {}, message: '', error: err_1.message || 'error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }
];
var checkVerifiedUser = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var pgUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pg.db.query(" SELECT u.* from public.\"user\" u where lower(u.\"email\") = lower ($1)", [email])];
            case 1:
                pgUser = (_a.sent()).rows;
                if (pgUser.length <= 0)
                    throw new createHttpError.NotFound('user not found!');
                else if (pgUser.length > 1)
                    throw new createHttpError.Conflict('duplicate users found in pg');
                if (!!password && !bcrypt.compareSync(password, pgUser[0].password))
                    throw new createHttpError.NotFound('user name/passowrd error!');
                return [2 /*return*/, pgUser[0]];
        }
    });
}); };
exports.checkVerified = [
    express_validator_1.body('email').isString().bail().exists(),
    express_validator_1.body('password').isString().bail().exists(),
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, user, jwt, jwtToken, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    payload = req.body;
                    return [4 /*yield*/, checkVerifiedUser(payload.email, payload.password)];
                case 1:
                    user = _a.sent();
                    user.password = "";
                    jwt = {
                        uid: user.id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin || false,
                        isVerified: user.isVerified || false,
                        tokenLife: +setting_1.settings.jwtTokenLifeTime,
                        actorType: 'user'
                    };
                    jwtToken = lib_auth_1.generateAuthToken(jwt);
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        code: http_status_codes_1.StatusCodes.OK, data: { token: jwtToken }, message: 'success'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    res.status(err_2.status).json({ code: err_2.status, data: {}, message: '', error: err_2.message || 'error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }
];
