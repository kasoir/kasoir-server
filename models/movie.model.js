"use strict";
exports.__esModule = true;
exports.getDefaultMovie = void 0;
var objectify_1 = require("../utils/objectify");
var defaultMovie = {
    id: '',
    name: '',
    category: '',
    description: '',
    director: '',
    year: '',
    rate: 0,
    price: 0,
    uploadDate: '',
    downloadLink: '',
    coverImage: ''
};
var getDefaultMovie = function () {
    return objectify_1.objectify(defaultMovie);
};
exports.getDefaultMovie = getDefaultMovie;
