"use strict";
exports.__esModule = true;
var BaseError = /** @class */ (function () {
    function BaseError(errorString, code, name) {
        this.message = errorString;
        this.code = code;
        this.name = name;
    }
    return BaseError;
}());
exports.BaseError = BaseError;
