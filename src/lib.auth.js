"use strict";
exports.__esModule = true;
exports.verifyAuthToken = exports.generateAuthToken = void 0;
var jwt = require("jsonwebtoken");
var setting_1 = require("../settings/setting");
var secret = setting_1.settings.botJwtSecret;
var tokenLifeSapn = setting_1.settings.jwtTokenLifeTime;
var generateAuthToken = function (payload) {
    return jwt.sign(payload, secret, {
        expiresIn: tokenLifeSapn + "d",
        algorithm: 'HS256'
    });
};
exports.generateAuthToken = generateAuthToken;
var verifyAuthToken = function (idToken) {
    try {
        return jwt.verify(idToken, secret);
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.verifyAuthToken = verifyAuthToken;
