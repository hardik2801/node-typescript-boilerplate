"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = require("./BaseError");
class AuthError extends BaseError_1.BaseError {
    constructor(errorString) {
        super(errorString, 100, AuthError.name);
    }
}
exports.AuthError = AuthError;
//# sourceMappingURL=AuthError.js.map