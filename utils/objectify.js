"use strict";
exports.__esModule = true;
exports.removeObjectEmptyOrNull = exports.objectify = void 0;
var objectify = function (payload) {
    return JSON.parse(JSON.stringify(payload));
};
exports.objectify = objectify;
var removeObjectEmptyOrNull = function (obj) {
    Object.keys(obj).forEach(function (k) {
        return (obj[k] && typeof obj[k] === 'object') && exports.removeObjectEmptyOrNull(obj[k]) ||
            (!obj[k] && obj[k] !== undefined) && delete obj[k];
    });
    return obj;
};
exports.removeObjectEmptyOrNull = removeObjectEmptyOrNull;
