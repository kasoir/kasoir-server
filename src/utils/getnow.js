"use strict";
exports.__esModule = true;
exports.getnowmsUTC = exports.getnowUTC = exports.getnowms = exports.getnow = exports.getnowDate = void 0;
var getnowDate = function () {
    var dateObject = new Date();
    var month = dateObject.getMonth() + 1;
    var day = dateObject.getDate();
    var year = dateObject.getFullYear();
    var date = (year * 10000 + month * 100 + day).toString();
    return date;
};
exports.getnowDate = getnowDate;
var getnow = function () {
    var dateObject = new Date();
    var month = dateObject.getMonth() + 1;
    var day = dateObject.getDate();
    var year = dateObject.getFullYear();
    var hour = dateObject.getHours();
    var minute = dateObject.getMinutes();
    var second = dateObject.getSeconds();
    var date = (year * 10000 + month * 100 + day).toString();
    var time = ('0' + (hour * 10000 + minute * 100 + second)).substr(-6);
    return date + 'T' + time;
};
exports.getnow = getnow;
var getnowms = function () {
    var dateObject = new Date();
    var month = dateObject.getMonth() + 1;
    var day = dateObject.getDate();
    var year = dateObject.getFullYear();
    var hour = dateObject.getHours();
    var minute = dateObject.getMinutes();
    var second = dateObject.getSeconds();
    var date = (year * 10000 + month * 100 + day).toString();
    var time = ('0' + (hour * 10000 + minute * 100 + second)).substr(-6);
    var ms = ('0000' + dateObject.getUTCMilliseconds()).substr(-4);
    return date + 'T' + time + 'M' + ms;
};
exports.getnowms = getnowms;
var getnowUTC = function () {
    var dateObject = new Date();
    var month = dateObject.getUTCMonth() + 1;
    var day = dateObject.getUTCDate();
    var year = dateObject.getUTCFullYear();
    var hour = dateObject.getUTCHours();
    var minute = dateObject.getUTCMinutes();
    var second = dateObject.getUTCSeconds();
    var date = (year * 10000 + month * 100 + day).toString();
    var time = ('0' + (hour * 10000 + minute * 100 + second)).substr(-6);
    return date + 'T' + time;
};
exports.getnowUTC = getnowUTC;
var getnowmsUTC = function () {
    var dateObject = new Date();
    var month = dateObject.getUTCMonth() + 1;
    var day = dateObject.getUTCDate();
    var year = dateObject.getUTCFullYear();
    var hour = dateObject.getUTCHours();
    var minute = dateObject.getUTCMinutes();
    var second = dateObject.getUTCSeconds();
    var date = (year * 10000 + month * 100 + day).toString();
    var time = ('0' + (hour * 10000 + minute * 100 + second)).substr(-6);
    var ms = ('0000' + dateObject.getUTCMilliseconds()).substr(-4);
    return date + 'T' + time + 'M' + ms;
};
exports.getnowmsUTC = getnowmsUTC;
