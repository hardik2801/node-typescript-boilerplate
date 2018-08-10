"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = require("./BaseError");
class ValidationError extends BaseError_1.BaseError {
    constructor(errorString) {
        super(errorString, 109, '');
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map