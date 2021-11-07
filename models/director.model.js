"use strict";
exports.__esModule = true;
exports.getDefaultDirector = void 0;
var objectify_1 = require("../utils/objectify");
var defaultDirector = {
    id: '',
    name: '',
    nationality: ''
};
var getDefaultDirector = function () {
    return objectify_1.objectify(defaultDirector);
};
exports.getDefaultDirector = getDefaultDirector;
