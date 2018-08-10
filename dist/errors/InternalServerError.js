"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = require("./BaseError");
class InternalServerError extends BaseError_1.BaseError {
    constructor(errorString) {
        super(errorString, 105, '');
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=InternalServerError.js.map