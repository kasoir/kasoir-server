"use strict";
exports.__esModule = true;
exports.getDefaultUser = void 0;
var objectify_1 = require("../utils/objectify");
var defaultUser = {
    password: '',
    id: '',
    name: '',
    isVerified: false,
    status: '',
    isAdmin: false,
    email: '',
    sex: '',
    birth: ''
};
var getDefaultUser = function () {
    return objectify_1.objectify(defaultUser);
};
exports.getDefaultUser = getDefaultUser;
