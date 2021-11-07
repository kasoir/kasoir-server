"use strict";
exports.__esModule = true;
exports.getDefaultActor = void 0;
var objectify_1 = require("../utils/objectify");
var defaultActor = {
    id: '',
    name: '',
    age: 0,
    birth: '',
    movies: []
};
var getDefaultActor = function () {
    return objectify_1.objectify(defaultActor);
};
exports.getDefaultActor = getDefaultActor;
