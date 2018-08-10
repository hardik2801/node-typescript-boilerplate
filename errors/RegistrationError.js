"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var BaseError_1 = require("./BaseError");
var RegistrationError = /** @class */ (function (_super) {
    __extends(RegistrationError, _super);
    function RegistrationError(errorString) {
        return _super.call(this, errorString, 101, 'RegistrationError') || this;
    }
    return RegistrationError;
}(BaseError_1.BaseError));
exports.RegistrationError = RegistrationError;