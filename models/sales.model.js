"use strict";
exports.__esModule = true;
exports.getDefaultSales = void 0;
var objectify_1 = require("../utils/objectify");
var defaultSales = {
    id: '',
    name: '',
    date: '',
    price: 0
};
var getDefaultSales = function () {
    return objectify_1.objectify(defaultSales);
};
exports.getDefaultSales = getDefaultSales;
