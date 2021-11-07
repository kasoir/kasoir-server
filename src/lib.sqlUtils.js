"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.executeTransaction = exports.cleanObject = exports.generateBulkDeleteQuery = exports.generateDeleteQuery = exports.bulkUpdate = exports.generateBulkUpsertQuery = exports.generateBulkInsertQuery = exports.generateSelectQueryText = exports.generateInsertQuery = exports.generateUpdateQuery = void 0;
var pg = require("./lib.pool");
var objectify_1 = require("../utils/objectify");
var generateUpdateQuery = function (tableName, defaultObject, updateObj, deleteId) {
    if (deleteId === void 0) { deleteId = true; }
    var cleaned = exports.cleanObject(defaultObject, updateObj);
    if (deleteId && 'id' in cleaned)
        delete cleaned['id'];
    var paramCounter = 0;
    var text = "UPDATE " + tableName + " SET";
    var values = [];
    for (var key in cleaned) {
        text += " \"" + key + "\" = $" + ++paramCounter + ",";
        values.push(cleaned[key]);
    }
    if (paramCounter)
        text = text.substr(0, text.length - 1);
    text += ' ';
    return { text: text, values: values, paramCounter: paramCounter };
};
exports.generateUpdateQuery = generateUpdateQuery;
var generateInsertQuery = function (tableName, defaultObject, insertObj, returnRow, deleteId) {
    if (returnRow === void 0) { returnRow = true; }
    if (deleteId === void 0) { deleteId = true; }
    var cleaned = exports.cleanObject(defaultObject, insertObj);
    if (deleteId && 'id' in cleaned)
        delete cleaned['id'];
    var paramCounter = 0;
    var text = "INSERT INTO " + tableName + " (" + Object.keys(cleaned).map(function (field) { return "\"" + field + "\""; }).join(',') + ") VALUES (";
    var values = [];
    for (var key in cleaned) {
        text += "$" + ++paramCounter + ",";
        values.push(cleaned[key]);
    }
    if (paramCounter)
        text = text.substr(0, text.length - 1);
    text += ') ';
    if (returnRow)
        text += 'RETURNING * ';
    return { text: text, values: values, paramCounter: paramCounter };
};
exports.generateInsertQuery = generateInsertQuery;
var generateSelectQueryText = function (tableName, fields) {
    return "SELECT " + fields.map(function (field) { return "\"" + field + "\""; }).join(',') + " from " + tableName + " ";
};
exports.generateSelectQueryText = generateSelectQueryText;
var generateBulkInsertQuery = function (tableName, defaultObject, insertObjs, returnRow, deleteId) {
    if (returnRow === void 0) { returnRow = true; }
    if (deleteId === void 0) { deleteId = true; }
    if (insertObjs.length === 0)
        throw new Error('bulk insert on empty array');
    var usedDefaultObject = __assign({}, defaultObject);
    var cleanedArray = insertObjs.map(function (insertObj) { return exports.cleanObject(defaultObject, insertObj); });
    if (deleteId) {
        cleanedArray = cleanedArray.map(function (cleaned) {
            if ('id' in cleaned) {
                delete cleaned['id'];
            }
            return cleaned;
        });
        if ('id' in usedDefaultObject)
            delete usedDefaultObject['id'];
    }
    var paramCounter = 0;
    var text = "INSERT INTO " + tableName + " (" + Object.keys(usedDefaultObject).map(function (field) { return "\"" + field + "\""; }).join(',') + ") VALUES ";
    if (!cleanedArray.length || cleanedArray.length === 0)
        throw new Error('Empty bulk insert array!');
    var inserts = cleanedArray.map(function (cleanedObject) {
        var paramValues = [];
        var params = '(';
        for (var key in usedDefaultObject) {
            params += "$" + ++paramCounter + ",";
            if (key in cleanedObject)
                paramValues.push(cleanedObject[key]);
            else
                paramValues.push(null);
        }
        params = params.substr(0, params.length - 1);
        params += ')';
        return { params: params, values: paramValues };
    });
    text += inserts.map(function (insert) { return insert.params; }).join(',');
    var values = inserts.map(function (insert) { return insert.values; });
    if (returnRow)
        text += 'RETURNING * ';
    return { text: text, values: values, paramCounter: paramCounter };
};
exports.generateBulkInsertQuery = generateBulkInsertQuery;
/**
 * Will not update 'id' field even if it's not the conflict field
 * @param tableName
 * @param defaultObject
 * @param upsertObjs
 * @param returnRow return upserted rows if true
 * @param conflictField
 */
var generateBulkUpsertQuery = function (tableName, defaultObject, upsertObjs, returnRow, conflictField) {
    if (returnRow === void 0) { returnRow = true; }
    if (conflictField === void 0) { conflictField = 'id'; }
    var defaultWithNoId = __assign({}, defaultObject);
    if ('id' in defaultWithNoId)
        delete defaultWithNoId['id'];
    var cleanedArray = upsertObjs.map(function (upsertObj) { return exports.cleanObject(defaultObject, upsertObj); });
    var paramCounter = 0;
    var text = "INSERT INTO " + tableName + " (" + Object.keys(defaultObject).map(function (field) { return "\"" + field + "\""; }).join(',') + ") VALUES ";
    var upserts = cleanedArray.map(function (cleanedObject) {
        var paramValues = [];
        var params = '(';
        for (var key in defaultObject) {
            params += "$" + ++paramCounter + ",";
            if (key in cleanedObject)
                paramValues.push(cleanedObject[key]);
            else
                paramValues.push(null);
        }
        params = params.substr(0, params.length - 1);
        params += ')';
        return { params: params, values: paramValues };
    });
    text += upserts.map(function (insert) { return insert.params; }).join(',');
    var values = upserts.map(function (insert) { return insert.values; });
    text += " ON CONFLICT(" + conflictField + ") DO UPDATE SET  " + Object.keys(defaultWithNoId).filter(function (key) { return key !== conflictField; }).map(function (field) { return "\"" + field + "\" = EXCLUDED.\"" + field + "\""; }).join(',');
    if (returnRow)
        text += 'RETURNING * ';
    return { text: text, values: values, paramCounter: paramCounter };
};
exports.generateBulkUpsertQuery = generateBulkUpsertQuery;
var bulkUpdate = function (client, tableName, defaultObject, updateObjs, returnRow) {
    if (returnRow === void 0) { returnRow = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var defaultWithNoId, bulkInsertQuery, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defaultWithNoId = __assign({}, defaultObject);
                    if ('id' in defaultWithNoId)
                        delete defaultWithNoId['id'];
                    return [4 /*yield*/, client.query("create TEMP table tmp as select * from " + tableName + " limit 0;")];
                case 1:
                    _a.sent();
                    bulkInsertQuery = exports.generateBulkInsertQuery('tmp', defaultObject, updateObjs, false, false);
                    return [4 /*yield*/, client.query(bulkInsertQuery.text, bulkInsertQuery.values)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.query("UPDATE " + tableName + " SET  " + Object.keys(defaultWithNoId).map(function (field) { return "\"" + field + "\" = tmp.\"" + field + "\""; }).join(',') + "\n\tfrom tmp Where " + tableName + ".id = tmp.id " + (returnRow ? 'RETURNING *' : '') + ";")];
                case 3:
                    res = _a.sent();
                    return [2 /*return*/, res.rows];
            }
        });
    });
};
exports.bulkUpdate = bulkUpdate;
var generateDeleteQuery = function (tableName, criterias) {
    var paramCounter = 0;
    var text = "DELETE FROM " + tableName + " WHERE";
    var values = [];
    for (var key in criterias) {
        text += " \"" + key + "\" = $" + ++paramCounter + " AND";
        values.push(criterias[key]);
    }
    if (paramCounter)
        text = text.substr(0, text.length - 3);
    text += '; ';
    return { text: text, values: values };
};
exports.generateDeleteQuery = generateDeleteQuery;
var generateBulkDeleteQuery = function (tableName, key, valueArray) {
    var text = "DELETE FROM " + tableName + " WHERE";
    var values = [];
    text += " \"" + key + "\" = ANY ($1);";
    values.push(valueArray);
    return { text: text, values: values };
};
exports.generateBulkDeleteQuery = generateBulkDeleteQuery;
var cleanObject = function (defaultObject, targetObject) {
    var cleaned = objectify_1.objectify(targetObject);
    for (var key in targetObject)
        if (!(key in defaultObject))
            delete cleaned[key];
    return cleaned;
};
exports.cleanObject = cleanObject;
var executeTransaction = function (queries) { return __awaiter(void 0, void 0, void 0, function () {
    var results, client, _i, queries_1, query, queryResult, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                results = [];
                return [4 /*yield*/, pg.db.connect()];
            case 1:
                client = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 9, 11, 12]);
                return [4 /*yield*/, client.query('BEGIN')];
            case 3:
                _a.sent();
                _i = 0, queries_1 = queries;
                _a.label = 4;
            case 4:
                if (!(_i < queries_1.length)) return [3 /*break*/, 7];
                query = queries_1[_i];
                return [4 /*yield*/, client.query(query.text, query.values)];
            case 5:
                queryResult = _a.sent();
                results.push(queryResult);
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7: return [4 /*yield*/, client.query('COMMIT')];
            case 8:
                _a.sent();
                return [2 /*return*/, results];
            case 9:
                error_1 = _a.sent();
                return [4 /*yield*/, client.query('ROLLBACK')];
            case 10:
                _a.sent();
                throw error_1;
            case 11:
                client.release();
                return [7 /*endfinally*/];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.executeTransaction = executeTransaction;
