"use strict";
exports.__esModule = true;
exports.row = exports.pageHeader = exports.formatDateForEndUser = void 0;
var formatDateForEndUser = function (date) {
    return date ? date.substring(6, 8) + '/' + date.substring(4, 6) + '/' + date.substring(0, 4) : '';
};
exports.formatDateForEndUser = formatDateForEndUser;
var pageHeader = function (topLeftText, filterFrom, filterTo, hidefields) {
    if (topLeftText === void 0) { topLeftText = ' '; }
    if (filterFrom === void 0) { filterFrom = ''; }
    if (filterTo === void 0) { filterTo = ''; }
    if (hidefields === void 0) { hidefields = false; }
    var border = [false, false, false, true];
    var margin = [1, 0, 10, 2];
    var fontSize = 12;
    var dateText = hidefields ? ' ' : exports.formatDateForEndUser(filterFrom) + " to " + exports.formatDateForEndUser(filterTo);
    return {
        table: {
            headerRows: 0,
            widths: [260, 260],
            body: [
                [{ text: topLeftText, fontSize: fontSize, bold: true, border: border, alignment: 'left', margin: margin }, { text: dateText, fontSize: fontSize, bold: true, border: border, alignment: 'right', margin: margin }],
            ]
        }
    };
};
exports.pageHeader = pageHeader;
var row = function (text1, text2, border, bold, alignment1, alignment2) {
    if (text1 === void 0) { text1 = ''; }
    if (text2 === void 0) { text2 = ''; }
    if (border === void 0) { border = [false, false, false, false]; }
    if (bold === void 0) { bold = false; }
    if (alignment1 === void 0) { alignment1 = 'left'; }
    if (alignment2 === void 0) { alignment2 = 'right'; }
    var fontSize = 8;
    return {
        table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
                [
                    { text: text1, fontSize: fontSize, border: border, bold: bold, alignment: alignment1 },
                    { text: text2, fontSize: fontSize, border: border, bold: bold, alignment: alignment2 },
                ]
            ]
        }
    };
};
exports.row = row;
