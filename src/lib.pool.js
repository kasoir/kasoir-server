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
exports.__esModule = true;
exports.db = void 0;
var pg_1 = require("pg");
var setting_1 = require("../settings/setting");
pg_1.types.setTypeParser(1700, function (val) { return parseFloat(val); });
exports.db = new pg_1.Pool(__assign(__assign({}, setting_1.settings.postgres), { application_name: 'socienta' }));
