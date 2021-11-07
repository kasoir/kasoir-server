"use strict";
exports.__esModule = true;
exports.getDefaultJwt = void 0;
var objectify_1 = require("../utils/objectify");
var defaultJwt = {
    uid: '',
    name: '',
    email: '',
    type: '',
    isAdmin: false,
    isVerified: false,
    tokenLife: 0,
    refreshToken: '',
    refreshTokenLife: 0,
    token: '',
    actorType: ''
};
var getDefaultJwt = function () {
    return objectify_1.objectify(defaultJwt);
};
exports.getDefaultJwt = getDefaultJwt;
