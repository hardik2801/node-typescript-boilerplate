"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError {
    constructor(errorString, code, name) {
        this.message = errorString;
        this.code = code;
        this.name = name;
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=BaseError.js.map