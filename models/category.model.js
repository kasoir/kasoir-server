"use strict";
exports.__esModule = true;
exports.getDefaultCategory = void 0;
var objectify_1 = require("../utils/objectify");
var defaultCategory = {
    id: '',
    description: ''
};
var getDefaultCategory = function () {
    return objectify_1.objectify(defaultCategory);
};
exports.getDefaultCategory = getDefaultCategory;
