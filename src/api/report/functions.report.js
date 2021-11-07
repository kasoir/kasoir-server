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
exports.getReport = void 0;
var express_validator_1 = require("express-validator");
var http_status_codes_1 = require("http-status-codes");
var pdf_format_1 = require("../../../settings/pdf-format");
var lib_cors_1 = require("../../lib.cors");
var pg = require("../../lib.pool");
var PdfMakeType = require("pdfmake");
var fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};
var pdfMake = new PdfMakeType(fonts);
exports.getReport = [
    express_validator_1.body('from').optional().bail().isString(),
    express_validator_1.body('to').optional().bail().isString(),
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var filterFrom, filterTo;
        return __generator(this, function (_a) {
            filterFrom = req.body.from;
            filterTo = req.body.to;
            try {
                lib_cors_1.cors(req, res, function () { return __awaiter(void 0, void 0, void 0, function () {
                    var documentDefinition, pdfDoc;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, generatePDF(filterFrom, filterTo)];
                            case 1:
                                documentDefinition = _a.sent();
                                pdfDoc = pdfMake.createPdfKitDocument(documentDefinition, {});
                                pdfDoc.end();
                                res.setHeader('Content-Type', 'application/pdf');
                                res.setHeader('Content-Disposition', 'attachment; filename=statement.pdf');
                                pdfDoc.pipe(res);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            }
            catch (error) {
                console.error(error);
                res.status(error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({
                    code: error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                    data: {},
                    message: '', error: error.message || 'Failed to fetch !'
                });
            }
            return [2 /*return*/];
        });
    }); },
];
var generatePDF = function (filterFrom, filterTo) { return __awaiter(void 0, void 0, void 0, function () {
    var sales, documentDefinition;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getSales(filterFrom, filterTo)];
            case 1:
                sales = _b.sent();
                _a = {
                    footer: function (currentPage, pageCount) {
                        return (currentPage !== 1) ? [
                            { canvas: [{ type: 'line', x1: 40, y1: 0, x2: 555, y2: 0, lineWidth: 2, lineColor: '#026fc0' }] },
                            {
                                columns: [
                                    { text: ' ', fontSize: 8 },
                                    { text: currentPage.toString() + ' of ' + pageCount, fontSize: 8, alignment: 'right' }
                                ],
                                margin: [40, 5]
                            },
                        ] : [];
                    }
                };
                return [4 /*yield*/, PDFContent(sales, filterFrom, filterTo)];
            case 2:
                documentDefinition = (_a.content = _b.sent(),
                    _a.pageMargins = [25, 50, 25, 0],
                    _a);
                return [2 /*return*/, documentDefinition];
        }
    });
}); };
var PDFContent = function (sales, filterFrom, filterTo) { return __awaiter(void 0, void 0, void 0, function () {
    var content, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                content = [];
                _b = (_a = content.push).apply;
                _c = [content];
                return [4 /*yield*/, sheet(sales, filterFrom, filterTo)];
            case 1:
                _b.apply(_a, _c.concat([_d.sent()]));
                return [2 /*return*/, content];
        }
    });
}); };
var sheet = function (sales, filterFrom, filterTo) { return __awaiter(void 0, void 0, void 0, function () {
    var formattedEndDate, pdfSheet, total;
    return __generator(this, function (_a) {
        formattedEndDate = filterTo.substring(6, 10) + "/" + filterTo.substring(4, 6) + "/" + filterTo.substring(0, 4);
        pdfSheet = [];
        total = 0;
        pdfSheet.push(pdf_format_1.pageHeader('Sales Report', "as at " + formattedEndDate, filterFrom, filterTo));
        pdfSheet.push({ text: ' ', margin: [0, 1, 1, 1] });
        pdfSheet.push(pdf_format_1.row());
        if (sales) {
            sales.forEach(function (item) {
                pdfSheet.push(pdf_format_1.row(item.name, item.price));
                total += item.price;
            });
        }
        else {
            pdfSheet.push(pdf_format_1.row("There is no sales"));
        }
        pdfSheet.push(pdf_format_1.row("Total", total.toString()));
        return [2 /*return*/, pdfSheet];
    });
}); };
var getSales = function (filterFrom, filterTo) { return __awaiter(void 0, void 0, void 0, function () {
    var query, values;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "Select name,Sum(price) as price from public.\"sales\" where date>=$1 AND date<=$2 group by name";
                values = [filterFrom, filterTo];
                return [4 /*yield*/, pg.db.query(query, values)];
            case 1: return [2 /*return*/, (_a.sent()).rows];
        }
    });
}); };
