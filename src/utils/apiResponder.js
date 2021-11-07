"use strict";
exports.__esModule = true;
exports.apiResponder = void 0;
var http_status_codes_1 = require("http-status-codes");
// Here we are handling the API endpoint responses
// Any API endpoint can still use res.send() function to respond, but in this case shouldn't return a result or should return falsy
// If the API endpoint is returning and not falsy and already responded below we will handle too
var apiResponder = function (fn) {
    return function (req, res, next) {
        fn(req, res, next).then(function (result) {
            if (!result)
                return;
            // Below we are again handling all the possible cases I could imagine.
            // API endpoint function can return an object as {message:'Text', data: <object to be sent as data> }
            //   This case will only be needed when we want to send a special message in the response body
            //   To be very honest, you can ony add .message to your return payload, and that message will be sent as message and 
            //   data will be the whole return payload in the absence of .data element
            // or endpoint can return { <object to be sent as data> }
            try {
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    code: http_status_codes_1.StatusCodes.OK,
                    message: result.message || 'Success',
                    data: result.onlyDataToBeSent || result
                });
            }
            catch (error) {
                // This is the place where we handle non-falsy returns, but already responded.
                // This is a very special case that we don't re-throw the error message to be handled by the error handling logic.
                console.error(error);
            }
        })["catch"](next);
    };
};
exports.apiResponder = apiResponder;
